import cv2
import os 
from ultralytics import YOLO
from datetime import datetime
from datetime import date

today = date.today()
d1 = today.strftime("%d-%m-%Y")

now = datetime.now()
dt_string = now.strftime("%H:%M")


# Open the video file
video_name = '4thfloor.mp4'

video_path = f"../data/{video_name}"

cap = cv2.VideoCapture(video_path)


w, h, fps = (int(cap.get(x)) for x in (cv2.CAP_PROP_FRAME_WIDTH, cv2.CAP_PROP_FRAME_HEIGHT, cv2.CAP_PROP_FPS))
frameSize = (w, h)

os.makedirs(f'../results/{d1}',exist_ok = True)

name = video_name.split(".")[0]

print(name)
print(f'../results/{d1}/{name}_{dt_string}')

out = cv2.VideoWriter(f'../results/{d1}/{name}_{dt_string}.mp4',cv2.VideoWriter_fourcc(*'MP4V'), fps, frameSize)


# Load the YOLOv8 model
model = YOLO('../models/yolov8m.pt')
# Loop through the video frames
while cap.isOpened():
    # Read a frame from the video
    success, frame = cap.read()

    if success:
        # Run YOLOv8 inference on the frame

        results = model.predict(frame,
                        device='cuda' ,
                        classes = [0,56] ,
                        conf = 0.15 ,
                        half =True,
        )
        # Visualize the results on the frame
        annotated_frame = results[0].plot(conf=False,
                                          labels = False)
        # cv2.line(annotated_frame,(987,1086),(1718,1151),(0,255,0),thickness = 5)
        annotated_frame = cv2.resize(annotated_frame,frameSize)
        # Display the annotated frame
        # cv2.imshow("YOLOv8 Inference", annotated_frame)
        out.write(annotated_frame)
        # Break the loop if 'q' is pressed
        if cv2.waitKey(1) & 0xFF == ord("q"):
            break
    else:
        # Break the loop if the end of the video is reached
        break
# Release the video capture object and close the display window
cap.release()
# out.release()
cv2.destroyAllWindows()