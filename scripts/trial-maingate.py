import cv2
from ultralytics import YOLO

# Load the YOLOv8 model
model = YOLO('model/yolov8n.pt')

# Open the video file
video_path = "4thfloor.mp4"
cap = cv2.VideoCapture(video_path)


w, h, fps = (int(cap.get(x)) for x in (cv2.CAP_PROP_FRAME_WIDTH, cv2.CAP_PROP_FRAME_HEIGHT, cv2.CAP_PROP_FPS))
frameSize = (1280, 720)

out = cv2.VideoWriter('output_video2.mp4',cv2.VideoWriter_fourcc(*'MP4V'), fps, frameSize)
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