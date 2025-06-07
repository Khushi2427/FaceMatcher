import sys
import cv2
import numpy as np
from deepface import DeepFace
from sklearn.metrics.pairwise import cosine_similarity
import pickle
import json
import os
import traceback

def process_image(image_path, embeddings_path):
    # Debug: Print input paths to stderr only
    print(f"Processing image: {image_path}", file=sys.stderr)
    print(f"Using embeddings: {embeddings_path}", file=sys.stderr)
    
    # Validate file paths
    if not os.path.exists(image_path):
        return {"error": f"Image file not found: {image_path}", "code": "FILE_NOT_FOUND"}
    if not os.path.exists(embeddings_path):
        return {"error": f"Embeddings file not found: {embeddings_path}", "code": "EMBEDDINGS_NOT_FOUND"}

    try:
        # Load actor embeddings 
        with open(embeddings_path, 'rb') as f:
            df = pickle.load(f)
            
        # Validate embeddings structure
        required_columns = ['embedding', 'actor', 'image_path']
        missing_columns = [col for col in required_columns if col not in df.columns]
        if missing_columns:
            return {"error": f"Missing columns in embeddings: {missing_columns}", "code": "INVALID_EMBEDDINGS"}

        # Validate embedding dimensions
        if len(df['embedding'].iloc[0]) != 128:
            return {"error": "Invalid embedding dimensions (expected 128)", "code": "INVALID_EMBEDDINGS"}

        # Extract face from uploaded image
        face_objs = DeepFace.extract_faces(
            img_path=image_path,
            detector_backend='mtcnn',
            enforce_detection=True,
            align=True
        )

        if not face_objs:
            return {"error": "No face detected in the image", "code": "NO_FACE_DETECTED"}

        face = face_objs[0]['face']

        # Convert and save face image
        if face.dtype == np.float64:
            face = (face * 255).astype(np.uint8)
        if face.shape[2] == 3:
            face = cv2.cvtColor(face, cv2.COLOR_RGB2BGR)

        static_dir = os.path.join(os.path.dirname(__file__), 'static')
        os.makedirs(static_dir, exist_ok=True)
        temp_filename = f"user_face_{os.getpid()}.jpg"
        temp_path = os.path.join(static_dir, temp_filename)
        cv2.imwrite(temp_path, face)

        # Get embedding
        embedding_obj = DeepFace.represent(
            img_path=temp_path,
            model_name='Facenet',
            detector_backend='skip',
            enforce_detection=False
        )
        
        if not embedding_obj:
            return {"error": "Failed to generate face embedding", "code": "EMBEDDING_FAILED"}
            
        embedding = embedding_obj[0]['embedding']

        # Compare with dataset
        similarities = []
        for emb in df['embedding']:
            sim = cosine_similarity([embedding], [emb])[0][0]
            similarities.append(sim)

        best_idx = np.argmax(similarities)
        similarity_score = float(similarities[best_idx])
        
        # Similarity threshold check
        SIMILARITY_THRESHOLD = 0.5
        if similarity_score < SIMILARITY_THRESHOLD:
            return {
                "error": "No confident match found",
                "code": "LOW_CONFIDENCE",
                "best_guess": df.iloc[best_idx]['actor'],
                "similarity": similarity_score
            }
        
        # Handle the image path transformation
        original_path = df.iloc[best_idx]['image_path']
        cleaned_path = original_path.split('Bollywood_data/')[-1] if 'Bollywood_data/' in original_path else original_path
        
        result = {
            "actor": df.iloc[best_idx]['actor'],
            "image": cleaned_path,
            "similarity": similarity_score,
            "userFace": f"static/{temp_filename}"
        }
        
        # Ensure the static directory path is correct
        if not os.path.exists(os.path.join(static_dir, temp_filename)):
            result['warning'] = "User face image was not saved correctly"
            
        return result

    except Exception as e:
        print(f"ERROR: {str(e)}", file=sys.stderr)
        print(traceback.format_exc(), file=sys.stderr)
        return {
            "error": str(e),
            "code": "PROCESSING_ERROR",
            "trace": traceback.format_exc().splitlines()[-1]
        }

if __name__ == '__main__':
    try:
        if len(sys.argv) != 3:
            result = {
                "error": "Usage: python match_face.py <image_path> <embeddings_path>",
                "code": "INVALID_ARGUMENTS"
            }
        else:
            result = process_image(sys.argv[1], sys.argv[2])
        
        # Ensure only one JSON object is printed to stdout
        print(json.dumps(result, separators=(',', ':')))  # Compact JSON
        
        # Exit with error code if there was an error
        sys.exit(2 if 'error' in result else 0)
            
    except Exception as e:
        error_result = {
            "error": f"Unexpected error: {str(e)}",
            "code": "UNHANDLED_ERROR",
            "trace": traceback.format_exc().splitlines()[-1]
        }
        print(json.dumps(error_result, separators=(',', ':')))
        sys.exit(3)