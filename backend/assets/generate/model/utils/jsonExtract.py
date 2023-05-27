import json
import sys

filePath = sys.argv[1]


def ext():
    print("json fike : ", filePath)
    with open(filePath, "r") as file:
        data = json.load(file)
        keys = list(data['results'].keys())
        sorted_keys = sorted(keys, key=len)
    output_data = {}

    for video_id, results in data["results"].items():
        max_score_result = max(results, key=lambda x: x["result"][0]["score"])
        output_data[video_id] = [{
            "label": max_score_result["result"][0]["label"],
            "score": max_score_result["result"][0]["score"],
        }]
    sorted_data = {}
    for key in sorted_keys:
        sorted_data[key] = [{
            "label": output_data[key][0]["label"],
            "score":output_data[key][0]["score"]
        }]
    output_json = {"results": sorted_data}

    with open(filePath, "w") as file:
        json.dump(output_json, file, indent=4)
    print("ok")


ext()
