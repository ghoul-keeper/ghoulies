# How to Generate Ghoulies

1. Have a folder in this directory called `assets` with all of GHOULAREYOU's assets. Should be something like `BACKGROUNDS`, `EYES`, etc...
2. Make any changes you want to `main.py`. Including total Ghoulie count and any assets/weights you want changed.
3. The script will guard for any mistakes with weight counts and will make sure all the Ghoulies are unique.
4. The script is a bit slow, so just keep it running in the background.
5. It will generate `trait_counts.txt`, `traits_with_none.json`, `traits_with_none_removes.json`, and the proof script will generate `final_proof_hash.txt`, `concatenated_hash_string.txt`, and `provenance_record.json`.
6. Make sure you are using Python3 / have python3 installed.
7. Have pip3 install pillow like so:

```
python3 -m pip install --upgrade Pillow
```

8. Run by running `make`. There is a `Makefile` that has all the commands you can run.

9. If you want to run it and then immediately proof the files, then you can run `make run_with_proof`

**Important**

- Make sure the weights for each trait add up to 100(if they don't the script will catch it and error out).
- Make sure the names of the traits are the same names as the files (excluding the file extension .png)

## Clean up

Clean up will happen automatially if you run the script using `make` or `make run`.

Alternatively you can run cleanup by running `make clean`

# Possible Errors

If you receive an error that says:

```
RecursionError: maximum recursion depth exceeded in comparison
```

It means you don't have enough traits to generate that many unique Ghoulies.

Lower the Ghoulie count or add more assets.
