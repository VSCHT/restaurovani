import requests
from yaml import safe_dump_all

vocabs = {
    "RestorationMethods": "https://restaurovani.vscht.cz/api/taxonomies/restoration-technology/",
    "FabricationTechnologies": "https://restaurovani.vscht.cz/api/taxonomies/fabrication-technology/",
    "MaterialTypes": "https://restaurovani.vscht.cz/api/taxonomies/material-type/",
    "Colors": "https://restaurovani.vscht.cz/api/taxonomies/color/",
    "ItemTypes": "https://restaurovani.vscht.cz/api/taxonomies/item-type/",
    "Dimensions": "https://restaurovani.vscht.cz/api/taxonomies/dimension/",
    "StylePeriods": "https://restaurovani.vscht.cz/api/taxonomies/period/",
    "Institutions": "https://restaurovani.vscht.cz/api/taxonomies/requestors/",
    "WorkTypes": "https://restaurovani.vscht.cz/api/taxonomies/work-type/",
    "ExaminationMethods": "https://restaurovani.vscht.cz/api/taxonomies/examination-methods/",
}

def convert_vocab(vocab_name, vocab_url):
    data = requests.get(vocab_url + f"?drilldown=True&size=1000")
    docs = []
    for d in data.json():
        docs.extend(convert_record(d))
    with open(f'files/{vocab_name}.yaml', 'w') as f:
        safe_dump_all(docs, f, allow_unicode=True)


def convert_record(x, parent=None):
    ret = {}
    x.pop('links')
    ret['id'] = x.pop('path')[1:].replace('/', '-')
    if parent:
        ret.setdefault('hierarchy', {})['parent'] = parent
    check_and_set(ret, x, 'tooltip')
    title = {}
    for t in x.pop('title'):
        title[t['lang']] = t['value']
    ret['title'] = title
    x.pop('level', None)
    x.pop('id', None)
    x.pop('slug', None)
    x.pop('descendants_count', None)
    x.pop('selectable', None)

    check_and_set(ret, x, 'endYear')
    check_and_set(ret, x, 'startYear')
    check_and_set(ret, x, 'address')
    check_and_set(ret, x, 'contact')
    check_and_set(ret, x, 'url')

    yield ret

    if 'children' in x:
        for c in x.pop('children'):
            yield from convert_record(c, ret['id'])


    if x != {}:
        raise Exception(x)


def check_and_set(ret, data, prop):
    if prop in data:
        value = data.pop(prop)
        if value:
            ret.setdefault('props', {})[prop] = str(value)



def main():
    for vocab_name, vocab_url in vocabs.items():
        convert_vocab(vocab_name, vocab_url)
    pass


if __name__ == '__main__':
    main()
