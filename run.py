from pathlib import Path
import json,shutil,subprocess,sys,os
base=Path(__file__).resolve().parent
repo=Path.home()/"bike-bay"
manifest=json.loads((base/"steps/manifest.json").read_text())
def run(*args):
 print("+"," ".join(args)); subprocess.run(args,cwd=repo,check=True)
run("git","config","user.name","andrenathanieldowdell-arch")
run("git","config","user.email","andrenathanieldowdell@gmail.com")
existing={line.strip() for line in subprocess.check_output(["git","log","--format=%s"],cwd=repo,text=True).splitlines()} if (repo/".git").exists() else set()
for entry in manifest:
 if entry["subject"] in existing: continue
 src=base/"steps"/entry["folder"]
 for item in src.rglob("*"):
  if item.is_file():
   target=repo/item.relative_to(src); target.parent.mkdir(parents=True,exist_ok=True); shutil.copy2(item,target)
 if entry.get("install"): run("npm","install")
 run("npm","run","typecheck"); run("npm","run","lint"); run("npm","test")
 run("git","add","."); run("git","commit","-m",entry["subject"])
existing_sha=subprocess.check_output(["git","rev-parse","HEAD"],cwd=repo,text=True).strip()
run("npm","ci","--include=dev","--engine-strict","--strict-peer-deps"); run("npm","run","check"); run("npm","run","test:zones")
run("git","push","origin","main")
out=repo/"handoff-output"; out.mkdir(exist_ok=True)
zip_path=out/"bike-bay-submit.zip"
import zipfile
with zipfile.ZipFile(zip_path,"w",zipfile.ZIP_DEFLATED) as z:
 for p in repo.rglob("*"):
  if p.is_file() and not any(part in {"node_modules","dist","handoff-output"} for part in p.parts): z.write(p,p.relative_to(repo.parent))
print("SETUP COMPLETE",existing_sha,"commits",len(manifest),"zip",zip_path)
