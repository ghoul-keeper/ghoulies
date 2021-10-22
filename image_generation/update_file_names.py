import os
import json

counter = 0

directory = "<path_to_directory>"


def listdir_nohidden(path):
    for f in os.listdir(path):
        if not f.startswith('.'):
            yield f


list_of_files = sorted(listdir_nohidden(directory),
                       key=lambda x: int(os.path.splitext(x)[0]))


for idx, file in enumerate(list_of_files):
    is_json_file = os.path.splitext(file)[1] == ".json"

    if(file == ".DS_Store"):
        break

    if(is_json_file):
        f_new = str(counter) + '.json'
    else:
        f_new = str(counter) + '.png'
        counter += 1

    os.rename(os.path.join(directory, file), os.path.join(directory, f_new))

    if(is_json_file):
        with open(directory + f_new, "r") as jsonFile:
            data = json.load(jsonFile)

        data["image"] = os.path.splitext(f_new)[0] + '.png'
        data["properties"]["files"][0]["uri"] = os.path.splitext(f_new)[
            0] + '.png'

        with open(directory + f_new, "w") as jsonFile:
            json.dump(data, jsonFile, indent=4)

    print("Old file " + file + " New file: " + f_new)
