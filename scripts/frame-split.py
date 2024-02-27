import cv2  
import os 

def FrameCapture(path,videoname): 
 
    cap = cv2.VideoCapture(path)
    assert cap.isOpened(), "Error reading video file"
    count = 0
    os.makedirs(f"../frames/{videoname}", exist_ok=True)  
    
    while cap.isOpened():
        
        success, image = cap.read()
        if success:
            cv2.imwrite(f"../frames/{videoname}/frame{count}.jpg", image) 
            count += 1

        else : 
            break


if __name__ == '__main__': 
 
	FrameCapture("../data/4thfloor.mp4","fourthfloor") 
