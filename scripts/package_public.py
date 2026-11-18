"""Package only the public Signal project. Python 3; standard library only."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import argparse

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--output', type=Path, default=ROOT / 'artifacts' / 'signal-aml-investigation-source.zip')
args = parser.parse_args()
output = args.output.resolve()
output.parent.mkdir(parents=True, exist_ok=True)
files = [ROOT / name for name in ['README.md', 'VERIFICATION.md', 'package.json', 'dev-server.mjs', '.gitignore', '.gitattributes']]
for folder in ['dist', 'tests', 'docs', 'scripts', '.github']:
    files.extend(sorted((ROOT / folder).rglob('*')))
with ZipFile(output, 'w', ZIP_DEFLATED) as archive:
    for file in files:
        if file.is_file() and file.resolve() != output and file.name != 'signal-aml-investigation-source.zip' and '__pycache__' not in file.parts:
            archive.write(file, file.relative_to(ROOT).as_posix())
with ZipFile(output) as archive:
    assert archive.testzip() is None
    assert all(not name.startswith('.') or name.startswith(('.github/', '.gitattributes', '.gitignore')) for name in archive.namelist())
print(f'Public package: {output} ({output.stat().st_size:,} bytes)')
