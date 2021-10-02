import hashlib
import os
import json

directory = "./output"
file_list = os.listdir(directory)
sorted_file_list = sorted(file_list, key=lambda x: int(os.path.splitext(x)[0]))
all_hashes_in_order_list = []
all_hashes = ""

for file in sorted_file_list:
    filename = os.fsdecode(file)
    json_filename = filename.split(".")[0] + ".json"
    if filename.endswith(".png"):
        with open(os.path.join(directory, filename), "rb") as f:
            bytes = f.read()
            readable_hash = hashlib.sha256(bytes).hexdigest()
            print(filename, json_filename, readable_hash)
            data = None

            with open(os.path.join(directory, json_filename), "r") as json_file:
                data = json.load(json_file)

            data["properties"]["imageHash"] = readable_hash
            all_hashes_in_order_list.append(readable_hash)

            with open(os.path.join(directory, json_filename), "w") as json_file:
                json.dump(data, json_file, indent=4)

hashes_joined = all_hashes.join(all_hashes_in_order_list)
final_hash = hashlib.sha256(hashes_joined.encode('utf-8')).hexdigest()

with open("concatenated_hash_string.txt", "w") as text_file:
    text_file.write(hashes_joined)

with open("final_proof_hash.txt", "w") as text_file:
    text_file.write(final_hash)

# Iterate back through and update the metadata with the final hash.
for file in sorted_file_list:
    filename = os.fsdecode(file)
    json_filename = filename.split(".")[0] + ".json"

    data = None
    with open(os.path.join(directory, json_filename), "r") as json_file:
        data = json.load(json_file)

    data["properties"]["provenance"] = final_hash

    with open(os.path.join(directory, json_filename), "w") as json_file:
        json.dump(data, json_file, indent=4)

with open("provenance_record.json", "w") as json_file:
    provenance_dict = {}
    for k, v in enumerate(all_hashes_in_order_list):
        provenance_dict[k] = v

    json.dump(provenance_dict, json_file, indent=4)

print("\n")
print(hashes_joined)
print("\n")
print(final_hash)
print("\n")
print("Done")
