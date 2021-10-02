run: 
	make clean
	@echo "\n"
	make generate

run_with_proof: 
	make clean
	@echo "\n"
	make generate
	@echo "\n"
	make proof

clean: 
	@echo "\n"
	@echo "Running clean up and deleting: ./concatenated_hash_string.txt ./final_proof_hash.txt ./provenance_record.json ./trait_counts.txt ./traits_with_none_removed.json ./traits_with_none.json ./output ./traits.json" && rm -rf ./concatenated_hash_string.txt ./final_proof_hash.txt ./provenance_record.json ./trait_counts.txt ./traits_with_none_removed.json ./traits_with_none.json ./output ./traits.json

generate: 
	@echo "\n"
	@python3 main.py

proof: 
	@echo "\n"
	@python3 proof.py