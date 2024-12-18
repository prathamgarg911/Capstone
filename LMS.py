from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from datetime import datetime,timedelta

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class Floor(BaseModel):
    id: int
    name: str

class Seat(BaseModel):
    id: int
    floor_id: int
    number: int
    is_occupied: bool

class Statistic(BaseModel):
    total_capacity: int
    average_occupancy_time: float
    current_occupancy_rate: float

class InOut(BaseModel):
    id: int
    timestamp: datetime
    is_entry: bool

# In-memory data storage
floors = [
    Floor(id=1, name="Ground Floor"),
    Floor(id=2, name="First Floor"),
    Floor(id=3, name="Second Floor"),
    Floor(id=4, name="Third Floor"),
    Floor(id=0, name="Third Floor"),
]

seats = [
    Seat(id=1, floor_id=1, number=1, is_occupied=False),
    Seat(id=2, floor_id=1, number=2, is_occupied=False),
    Seat(id=3, floor_id=1, number=3, is_occupied=True),
    Seat(id=4, floor_id=1, number=4, is_occupied=False),
    Seat(id=5, floor_id=1, number=5, is_occupied=True),
    Seat(id=6, floor_id=1, number=6, is_occupied=True),
    Seat(id=7, floor_id=1, number=7, is_occupied=True),
    Seat(id=8, floor_id=1, number=8, is_occupied=False),
    Seat(id=9, floor_id=1, number=9, is_occupied=True),
    Seat(id=10, floor_id=1, number=10, is_occupied=False),
    Seat(id=11, floor_id=1, number=11, is_occupied=False),
    Seat(id=12, floor_id=1, number=12, is_occupied=True),
    Seat(id=13, floor_id=1, number=13, is_occupied=False),
    Seat(id=14, floor_id=1, number=14, is_occupied=True),
    Seat(id=15, floor_id=1, number=15, is_occupied=False),
    Seat(id=16, floor_id=1, number=16, is_occupied=False),
    Seat(id=17, floor_id=1, number=17, is_occupied=True),
    Seat(id=18, floor_id=1, number=18, is_occupied=False),
    Seat(id=19, floor_id=1, number=19, is_occupied=True),
    Seat(id=20, floor_id=1, number=20, is_occupied=True),
    Seat(id=21, floor_id=1, number=21, is_occupied=False),
    Seat(id=22, floor_id=1, number=22, is_occupied=True),
    Seat(id=23, floor_id=1, number=23, is_occupied=True),
    Seat(id=24, floor_id=1, number=24, is_occupied=False),
    Seat(id=25, floor_id=1, number=25, is_occupied=True),
    Seat(id=26, floor_id=1, number=26, is_occupied=False),
    Seat(id=27, floor_id=1, number=27, is_occupied=False),
    Seat(id=28, floor_id=1, number=28, is_occupied=True),
    Seat(id=29, floor_id=1, number=29, is_occupied=False),
    Seat(id=30, floor_id=1, number=30, is_occupied=True),
    Seat(id=31, floor_id=1, number=31, is_occupied=False),
    Seat(id=32, floor_id=1, number=32, is_occupied=False),
    Seat(id=33, floor_id=1, number=33, is_occupied=True),
    Seat(id=34, floor_id=1, number=34, is_occupied=True),
    Seat(id=35, floor_id=1, number=35, is_occupied=False),
    Seat(id=36, floor_id=1, number=36, is_occupied=True),
    Seat(id=37, floor_id=1, number=37, is_occupied=False),
    Seat(id=38, floor_id=1, number=38, is_occupied=True),
    Seat(id=39, floor_id=1, number=39, is_occupied=False),
    Seat(id=40, floor_id=1, number=40, is_occupied=True),
    Seat(id=41, floor_id=1, number=41, is_occupied=False),
    Seat(id=42, floor_id=1, number=42, is_occupied=True),
    Seat(id=43, floor_id=1, number=43, is_occupied=True),
    Seat(id=44, floor_id=1, number=44, is_occupied=False),
    Seat(id=45, floor_id=1, number=45, is_occupied=True),
    Seat(id=46, floor_id=1, number=46, is_occupied=False),
    Seat(id=47, floor_id=1, number=47, is_occupied=True),
    Seat(id=48, floor_id=1, number=48, is_occupied=False),
    Seat(id=49, floor_id=1, number=49, is_occupied=True),
    Seat(id=50, floor_id=1, number=50, is_occupied=False),
    Seat(id=51, floor_id=1, number=51, is_occupied=True),
    Seat(id=52, floor_id=1, number=52, is_occupied=False),
    Seat(id=53, floor_id=1, number=53, is_occupied=True),
    Seat(id=54, floor_id=1, number=54, is_occupied=True),
    Seat(id=55, floor_id=1, number=55, is_occupied=False),
    Seat(id=56, floor_id=1, number=56, is_occupied=True),
    Seat(id=57, floor_id=1, number=57, is_occupied=True),
    Seat(id=58, floor_id=1, number=58, is_occupied=False),
    Seat(id=59, floor_id=1, number=59, is_occupied=True),
    Seat(id=60, floor_id=1, number=60, is_occupied=False),
    Seat(id=61, floor_id=1, number=61, is_occupied=True),
    Seat(id=62, floor_id=1, number=62, is_occupied=False),
    Seat(id=63, floor_id=1, number=63, is_occupied=True),
    Seat(id=64, floor_id=1, number=64, is_occupied=False),
    Seat(id=65, floor_id=2, number=1, is_occupied=True),
    Seat(id=66, floor_id=2, number=2, is_occupied=False),
    Seat(id=67, floor_id=2, number=3, is_occupied=True),
    Seat(id=68, floor_id=2, number=4, is_occupied=False),
    Seat(id=69, floor_id=2, number=5, is_occupied=True),
    Seat(id=70, floor_id=2, number=6, is_occupied=False),
    Seat(id=71, floor_id=2, number=7, is_occupied=False),
    Seat(id=72, floor_id=2, number=8, is_occupied=True),
    Seat(id=73, floor_id=2, number=9, is_occupied=False),
    Seat(id=74, floor_id=2, number=10, is_occupied=True),
    Seat(id=75, floor_id=2, number=11, is_occupied=False),
    Seat(id=76, floor_id=2, number=12, is_occupied=False),
    Seat(id=77, floor_id=2, number=13, is_occupied=True),
    Seat(id=78, floor_id=2, number=14, is_occupied=False),
    Seat(id=79, floor_id=2, number=15, is_occupied=True),
    Seat(id=80, floor_id=2, number=16, is_occupied=False),
    Seat(id=81, floor_id=2, number=17, is_occupied=False),
    Seat(id=82, floor_id=2, number=18, is_occupied=True),
    Seat(id=83, floor_id=2, number=19, is_occupied=False),
    Seat(id=84, floor_id=2, number=20, is_occupied=True),
    Seat(id=85, floor_id=2, number=21, is_occupied=False),
    Seat(id=86, floor_id=2, number=22, is_occupied=True),
    Seat(id=87, floor_id=2, number=23, is_occupied=False),
    Seat(id=88, floor_id=2, number=24, is_occupied=False),
    Seat(id=89, floor_id=2, number=25, is_occupied=True),
    Seat(id=90, floor_id=2, number=26, is_occupied=False),
    Seat(id=91, floor_id=2, number=27, is_occupied=True),
    Seat(id=92, floor_id=2, number=28, is_occupied=False),
    Seat(id=93, floor_id=2, number=29, is_occupied=False),
    Seat(id=94, floor_id=2, number=30, is_occupied=True),
    Seat(id=95, floor_id=2, number=31, is_occupied=True),
    Seat(id=96, floor_id=2, number=32, is_occupied=False),
    Seat(id=97, floor_id=2, number=33, is_occupied=False),
    Seat(id=98, floor_id=2, number=34, is_occupied=True),
    Seat(id=99, floor_id=2, number=35, is_occupied=True),
    Seat(id=100, floor_id=2, number=36, is_occupied=False),
    Seat(id=101, floor_id=2, number=37, is_occupied=True),
    Seat(id=102, floor_id=2, number=38, is_occupied=False),
    Seat(id=103, floor_id=2, number=39, is_occupied=False),
    Seat(id=104, floor_id=2, number=40, is_occupied=True),
    Seat(id=105, floor_id=2, number=41, is_occupied=False),
    Seat(id=106, floor_id=2, number=42, is_occupied=True),
    Seat(id=107, floor_id=2, number=43, is_occupied=False),
    Seat(id=108, floor_id=2, number=44, is_occupied=True),
    Seat(id=109, floor_id=2, number=45, is_occupied=False),
    Seat(id=110, floor_id=2, number=46, is_occupied=False),
    Seat(id=111, floor_id=2, number=47, is_occupied=True),
    Seat(id=112, floor_id=2, number=48, is_occupied=False),
    Seat(id=113, floor_id=2, number=49, is_occupied=False),
    Seat(id=114, floor_id=2, number=50, is_occupied=True),

    # Floor 3
    Seat(id=115, floor_id=3, number=1, is_occupied=False),
    Seat(id=116, floor_id=3, number=2, is_occupied=True),
    Seat(id=117, floor_id=3, number=3, is_occupied=False),
    Seat(id=118, floor_id=3, number=4, is_occupied=False),
    Seat(id=119, floor_id=3, number=5, is_occupied=True),
    Seat(id=120, floor_id=3, number=6, is_occupied=False),
    Seat(id=121, floor_id=3, number=7, is_occupied=False),
    Seat(id=122, floor_id=3, number=8, is_occupied=True),
    Seat(id=123, floor_id=3, number=9, is_occupied=True),
    Seat(id=124, floor_id=3, number=10, is_occupied=False),
    Seat(id=125, floor_id=3, number=11, is_occupied=False),
    Seat(id=126, floor_id=3, number=12, is_occupied=True),
    Seat(id=127, floor_id=3, number=13, is_occupied=False),
    Seat(id=128, floor_id=3, number=14, is_occupied=False),
    Seat(id=129, floor_id=3, number=15, is_occupied=True),
    Seat(id=130, floor_id=3, number=16, is_occupied=True),
    Seat(id=131, floor_id=3, number=17, is_occupied=False),
    Seat(id=132, floor_id=3, number=18, is_occupied=True),
    Seat(id=133, floor_id=3, number=19, is_occupied=False),
    Seat(id=134, floor_id=3, number=20, is_occupied=True),
    Seat(id=135, floor_id=3, number=21, is_occupied=False),
    Seat(id=136, floor_id=3, number=22, is_occupied=False),
    Seat(id=137, floor_id=3, number=23, is_occupied=True),
    Seat(id=138, floor_id=3, number=24, is_occupied=False),
    Seat(id=139, floor_id=3, number=25, is_occupied=True),
    Seat(id=140, floor_id=3, number=26, is_occupied=False),
    Seat(id=141, floor_id=3, number=27, is_occupied=False),
    Seat(id=142, floor_id=3, number=28, is_occupied=True),
    Seat(id=143, floor_id=3, number=29, is_occupied=False),
    Seat(id=144, floor_id=3, number=30, is_occupied=True),
    Seat(id=145, floor_id=3, number=31, is_occupied=False),
    Seat(id=146, floor_id=3, number=32, is_occupied=False),
    Seat(id=147, floor_id=3, number=33, is_occupied=True),
    Seat(id=148, floor_id=3, number=34, is_occupied=False),
    Seat(id=149, floor_id=3, number=35, is_occupied=True),
    Seat(id=150, floor_id=3, number=36, is_occupied=False),
    Seat(id=151, floor_id=3, number=37, is_occupied=False),
    Seat(id=152, floor_id=3, number=38, is_occupied=True),
    Seat(id=153, floor_id=3, number=39, is_occupied=False),
    Seat(id=154, floor_id=3, number=40, is_occupied=True),
    Seat(id=155, floor_id=3, number=41, is_occupied=False),
    Seat(id=156, floor_id=3, number=42, is_occupied=True),
    Seat(id=157, floor_id=3, number=43, is_occupied=False),
    Seat(id=158, floor_id=3, number=44, is_occupied=False),
    Seat(id=159, floor_id=3, number=45, is_occupied=True),
    Seat(id=160, floor_id=3, number=46, is_occupied=False),
    Seat(id=161, floor_id=3, number=47, is_occupied=False),
    Seat(id=162, floor_id=3, number=48, is_occupied=True),
    Seat(id=163, floor_id=3, number=49, is_occupied=False),
    Seat(id=164, floor_id=3, number=50, is_occupied=True),
    Seat(id=165, floor_id=3, number=51, is_occupied=False),
    Seat(id=166, floor_id=3, number=52, is_occupied=True),
    Seat(id=167, floor_id=3, number=53, is_occupied=False),
    Seat(id=168, floor_id=3, number=54, is_occupied=False),
    Seat(id=169, floor_id=3, number=55, is_occupied=True),
    Seat(id=170, floor_id=3, number=56, is_occupied=False),
    Seat(id=171, floor_id=3, number=57, is_occupied=False),
    Seat(id=172, floor_id=3, number=58, is_occupied=True),
    Seat(id=173, floor_id=3, number=59, is_occupied=False),
    Seat(id=174, floor_id=3, number=60, is_occupied=True),
    Seat(id=175, floor_id=3, number=61, is_occupied=False),
    Seat(id=176, floor_id=3, number=62, is_occupied=False),
    Seat(id=177, floor_id=3, number=63, is_occupied=True),
    Seat(id=178, floor_id=3, number=64, is_occupied=False),
    Seat(id=179, floor_id=4, number=1, is_occupied=True),
    Seat(id=180, floor_id=4, number=2, is_occupied=False),
    Seat(id=181, floor_id=4, number=3, is_occupied=True),
    Seat(id=182, floor_id=4, number=4, is_occupied=False),
    Seat(id=183, floor_id=4, number=5, is_occupied=True),
    Seat(id=184, floor_id=4, number=6, is_occupied=True),
    Seat(id=185, floor_id=4, number=7, is_occupied=False),
    Seat(id=186, floor_id=4, number=8, is_occupied=False),
    Seat(id=187, floor_id=4, number=9, is_occupied=True),
    Seat(id=188, floor_id=4, number=10, is_occupied=False),
    Seat(id=189, floor_id=4, number=11, is_occupied=True),
    Seat(id=190, floor_id=4, number=12, is_occupied=True),
    Seat(id=191, floor_id=4, number=13, is_occupied=False),
    Seat(id=192, floor_id=4, number=14, is_occupied=False),
    Seat(id=193, floor_id=4, number=15, is_occupied=True),
    Seat(id=194, floor_id=4, number=16, is_occupied=False),
    Seat(id=195, floor_id=4, number=17, is_occupied=True),
    Seat(id=196, floor_id=4, number=18, is_occupied=False),
    Seat(id=197, floor_id=4, number=19, is_occupied=False),
    Seat(id=198, floor_id=4, number=20, is_occupied=True),
    Seat(id=199, floor_id=4, number=21, is_occupied=True),
    Seat(id=200, floor_id=4, number=22, is_occupied=False),
    Seat(id=201, floor_id=4, number=23, is_occupied=True),
    Seat(id=202, floor_id=4, number=24, is_occupied=False),
    Seat(id=203, floor_id=4, number=25, is_occupied=True),
    Seat(id=204, floor_id=4, number=26, is_occupied=True),
    Seat(id=205, floor_id=4, number=27, is_occupied=False),
    Seat(id=206, floor_id=4, number=28, is_occupied=False),
    Seat(id=207, floor_id=4, number=29, is_occupied=True),
    Seat(id=208, floor_id=4, number=30, is_occupied=True),
    Seat(id=209, floor_id=4, number=31, is_occupied=False),
    Seat(id=210, floor_id=4, number=32, is_occupied=False),
    Seat(id=211, floor_id=4, number=33, is_occupied=True),
    Seat(id=212, floor_id=4, number=34, is_occupied=False),
    Seat(id=213, floor_id=4, number=35, is_occupied=True),
    Seat(id=214, floor_id=4, number=36, is_occupied=False),
    Seat(id=215, floor_id=4, number=37, is_occupied=True),
    Seat(id=216, floor_id=4, number=38, is_occupied=False),
    Seat(id=217, floor_id=4, number=39, is_occupied=False),
    Seat(id=218, floor_id=4, number=40, is_occupied=True),
    Seat(id=219, floor_id=4, number=41, is_occupied=True),
    Seat(id=220, floor_id=4, number=42, is_occupied=False),
    Seat(id=221, floor_id=4, number=43, is_occupied=True),
    Seat(id=222, floor_id=4, number=44, is_occupied=False),
    Seat(id=223, floor_id=4, number=45, is_occupied=True),
    Seat(id=224, floor_id=4, number=46, is_occupied=False),
    Seat(id=225, floor_id=4, number=47, is_occupied=True),
    Seat(id=226, floor_id=4, number=48, is_occupied=False),
    Seat(id=227, floor_id=4, number=49, is_occupied=False),
    Seat(id=228, floor_id=4, number=50, is_occupied=True),
    Seat(id=229, floor_id=4, number=51, is_occupied=True),
    Seat(id=230, floor_id=4, number=52, is_occupied=False),
    Seat(id=231, floor_id=4, number=53, is_occupied=True),
    Seat(id=232, floor_id=4, number=54, is_occupied=False),
    Seat(id=233, floor_id=4, number=55, is_occupied=True),
    Seat(id=234, floor_id=4, number=56, is_occupied=True),
    Seat(id=235, floor_id=4, number=57, is_occupied=False),
    Seat(id=236, floor_id=4, number=58, is_occupied=False),
    Seat(id=237, floor_id=4, number=59, is_occupied=True),
    Seat(id=238, floor_id=4, number=60, is_occupied=True),
    Seat(id=239, floor_id=4, number=61, is_occupied=False),
    Seat(id=240, floor_id=4, number=62, is_occupied=False),
    Seat(id=241, floor_id=4, number=63, is_occupied=True),
    Seat(id=242, floor_id=4, number=64, is_occupied=False),
    
]

# Adding sufficient dummy data for testing
in_out_records = [
    {"id": 1, "timestamp": datetime(2024, 12, 17, 8, 15), "is_entry": False},
    {"id": 2, "timestamp": datetime(2024, 12, 17, 9, 45), "is_entry": False},
    {"id": 3, "timestamp": datetime(2024, 12, 17, 10, 30), "is_entry": False},
    {"id": 4, "timestamp": datetime(2024, 12, 17, 11, 15), "is_entry": False},
    {"id": 5, "timestamp": datetime(2024, 12, 17, 12, 45), "is_entry": False},
    {"id": 6, "timestamp": datetime(2024, 12, 17, 13, 20), "is_entry": False},
    {"id": 7, "timestamp": datetime(2024, 12, 17, 14, 10), "is_entry": False},
    {"id": 8, "timestamp": datetime(2024, 12, 17, 15, 50), "is_entry": False},
    {"id": 9, "timestamp": datetime(2024, 12, 17, 16, 40), "is_entry": False},
    {"id": 10, "timestamp": datetime(2024, 12, 17, 17, 30), "is_entry": True},
    {"id": 11, "timestamp": datetime(2024, 12, 17, 17, 30), "is_entry": True},
    {"id": 12, "timestamp": datetime(2024, 12, 17, 17, 30), "is_entry": True},
    {"id": 13, "timestamp": datetime(2024, 12, 17, 16, 30), "is_entry": True},
    {"id": 14, "timestamp": datetime(2024, 12, 17, 15, 30), "is_entry": True}
]
# Endpoints
@app.get("/floors/", response_model=List[Floor])
def read_floors():
    return floors

@app.get("/seats/", response_model=List[Seat])
def read_seats(floor_id: int):
    return [seat for seat in seats if seat.floor_id == floor_id]

@app.put("/seats/{seat_id}", response_model=Seat)
def update_seat(seat_id: int, seat_update: Seat):
    for seat in seats:
        if seat.id == seat_id:
            seat.is_occupied = seat_update.is_occupied
            return seat
    raise HTTPException(status_code=404, detail="Seat not found")

@app.get("/statistics/", response_model=Statistic)
def read_statistics():
    total_capacity = len(seats)
    occupied_seats = sum(1 for seat in seats if seat.is_occupied)
    current_occupancy_rate = (occupied_seats / total_capacity) * 100 if total_capacity > 0 else 0
    return Statistic(
        total_capacity=total_capacity,
        average_occupancy_time=2.5,  # Placeholder value
        current_occupancy_rate=current_occupancy_rate
    )

@app.post("/in-out/", response_model=InOut)
def create_in_out(in_out: InOut):
    new_id = len(in_out_records) + 1
    new_record = InOut(id=new_id, timestamp=datetime.now(), is_entry=in_out.is_entry)
    in_out_records.append(new_record)
    return new_record

# @app.get("/in-out/", response_model=List[dict])
# def read_in_out():
#     # Accumulate data for bar chart display
#     time_slots = [(datetime(2024, 12, 17, 8, 0) + timedelta(hours=i)) for i in range(10)]
#     entries_count = [0] * len(time_slots)
#     exits_count = [0] * len(time_slots)

#     for record in in_out_records:
#         hour_index = next((i for i, t in enumerate(time_slots) if t <= record.timestamp < t + timedelta(hours=1)), None)
#         if hour_index is not None:
#             if record.is_entry:
#                 entries_count[hour_index] += 1
#             else:
#                 exits_count[hour_index] += 1

#     result = []
#     for i, start_time in enumerate(time_slots):
#         result.append({
#             "hour": f"{start_time.strftime('%H:%M')} - {(start_time + timedelta(hours=1)).strftime('%H:%M')}",
#             "entries": entries_count[i],
#             "exits": exits_count[i]
#         })

#     return result

@app.get("/in-out/")
def read_in_out():
    hourly_data = {}
    for record in in_out_records:
        hour = record["timestamp"].strftime("%H:00")
        if hour not in hourly_data:
            hourly_data[hour] = {"entries": 0, "exits": 0}
        if record["is_entry"]:
            hourly_data[hour]["entries"] += 1
        else:
            hourly_data[hour]["exits"] += 1
    return [{"hour": hour, "entries": data["entries"], "exits": data["exits"]} for hour, data in sorted(hourly_data.items())]

@app.get("/seat-occupancy/")
def get_seat_occupancy():
    total_seats = len(seats)
    occupied_seats = sum(1 for seat in seats if seat.is_occupied)
    occupancy_rate = (occupied_seats / total_seats) * 100 if total_seats > 0 else 0
    return {
        "total_seats": total_seats,
        "occupied_seats": occupied_seats,
        "occupancy_rate": occupancy_rate
    }

@app.get("/analytics/")
def get_analytics():
    total_entries = sum(1 for record in in_out_records if record.is_entry)
    total_exits = sum(1 for record in in_out_records if not record.is_entry)
    current_occupancy = total_entries - total_exits
    occupancy_rate = get_seat_occupancy()["occupancy_rate"]
    
    return {
        "total_entries": total_entries,
        "total_exits": total_exits,
        "current_occupancy": current_occupancy,
        "occupancy_rate": occupancy_rate
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)