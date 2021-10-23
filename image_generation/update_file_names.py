import os
import json

counter_png = 0
counter_json = 0

directory = "<path_to_directory>"


def listdir_nohidden(path):
    for f in os.listdir(path):
        if not f.startswith('.'):
            yield f


list_of_files = sorted(listdir_nohidden(directory),
                       key=lambda x: int(os.path.splitext(x)[0]))

print("Updating images....")

for idx, file in enumerate(list_of_files):
    is_png_file = os.path.splitext(file)[1] == ".png"

    if(file == ".DS_Store"):
        break

    if(is_png_file):
        f_new = str(counter_png) + '.png'
        os.rename(os.path.join(directory, file),
                  os.path.join(directory, f_new))
        counter_png += 1

        print("Old png file " + file + " New png file: " + f_new)


print("Finished updating pngs...")
print("Updating json files....")

for idx, file in enumerate(list_of_files):
    is_json_file = os.path.splitext(file)[1] == ".json"

    if(file == ".DS_Store"):
        break

    if(is_json_file):
        f_new = str(counter_json) + '.json'
        counter_json += 1

        with open(directory + file, "r") as jsonFile:
            data = json.load(jsonFile)

        data["image"] = os.path.splitext(f_new)[0] + '.png'
        data["properties"]["files"][0]["uri"] = os.path.splitext(f_new)[
            0] + '.png'

        with open(directory + f_new, "w") as jsonFile:
            json.dump(data, jsonFile, indent=4)

        os.remove(os.path.join(directory, file))

        print("Old json file " + file + " New json file: " + f_new)


print("All done!")
