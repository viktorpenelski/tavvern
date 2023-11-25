from typing import Dict, Protocol
import json
import os


class ItemIdMapper(Protocol):
    def add_item(self, name: str) -> int:
        raise Exception('Not implemented')

    def get_name_mapping(self) -> Dict[str, int]:
        raise Exception('Not implemented')

    def get_id_mapping(self) -> Dict[int, str]:
        raise Exception('Not implemented')


class FileItemIdMapper(ItemIdMapper):

    def __init__(self, file_path: str) -> None:
        super().__init__()
        self.file_path = file_path
        self.cache = {}
        self.max_id = 0

    def __enter__(self):
        if os.path.exists(self.file_path):
            with open(self.file_path, 'r') as f:
                read = f.read()
                self.cache: Dict[str, int] = json.loads(read)
                if len(self.cache) > 0:
                    self.max_id = max([id for id in self.cache.values()])
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        with open(self.file_path, 'w+') as f:
            jsonified = json.dumps(self.cache, indent=2)
            f.write(jsonified)

    def add_item(self, name: str) -> int:
        if name not in self.cache:
            self.max_id = self.max_id + 1
            self.cache[name] = self.max_id
        return self.cache[name]


    def get_name_mapping(self) -> Dict[str, int]:
        return self.cache

    def get_id_mapping(self) -> Dict[int, str]:
        return {v: k for (k, v) in self.cache.items()}
