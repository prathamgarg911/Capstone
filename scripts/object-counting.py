from ultralytics import YOLO
# from ultralytics.solutions import object_counter
from ...ultralytics.solutions import object_counter
import cv2

model = YOLO("model/yolov8n.pt")
cap = cv2.VideoCapture("data/maingate-tester-3.mp4")
assert cap.isOpened(), "Error reading video file"
w, h, fps = (int(cap.get(x)) for x in (cv2.CAP_PROP_FRAME_WIDTH, cv2.CAP_PROP_FRAME_HEIGHT, cv2.CAP_PROP_FPS))
# w,h = 1280,720

# Define line points
line_points = [(800,1335),(1617,1418),(1698,1149),(910,1206)]

# Video writer  
video_writer = cv2.VideoWriter("results/object_counting_output-4.mp4",
                       cv2.VideoWriter_fourcc(*'mp4v'),
                       fps,
                       (w, h))

# Init Object Counter
counter = object_counter.ObjectCounter()
counter.set_args(view_img=False,
                 reg_pts=line_points,
                 classes_names=model.names,
                 draw_tracks=True,
                 line_dist_thresh = 5)  

while cap.isOpened():
    success, im0 = cap.read()
    if not success:
        print("Video frame is empty or video processing has been successfully completed.")
        break
    tracks = model.track(im0, persist=True, show=False, classes= [0],
                        #  tracker='deepsort.yaml'
                         )

    im0 = counter.start_counting(im0, tracks)
    video_writer.write(im0)

cap.release()
video_writer.release()
cv2.destroyAllWindows()
# print("total in: " + counter.in_counts + "total out: " + counter.out_counts)