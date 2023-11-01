# restaurovani

# Database from scratch

```yaml
# reinitialize the database
nrp invenio db destroy
nrp invenio db init
nrp invenio db create

# reinitialize opensearch index
nrp invenio index destroy
nrp invenio index init
nrp oarepo cf init

# load vocabularies
nrp oarepo fixtures load

# create bucket for files
invenio files location create --default default s3://default

# grab the data from the old repository and transform them to the new format
cd /tmp
python3 -m venv venv
./venv/bin/pip install requests pyyaml
./venv/bin/python3 local/restoration-common/restoration_common/old_data/download_old_data.py

# install the data
cd -
nrp oarepo fixtures load --no-system-fixtures ../../local/restoration-common/restoration_common/old_data/data --show-error-entry

# continue with the development
nrp develop
```