export class MenuSections{
    sections: SectionItems[];
}

export class SectionItems{
    id: String;
    name: String;
    url: String;
}

export class SectionMenuList{
    items: Item[];
}

export class Item{
    id: String;
    name: String;
}

export class UserOrder{
    name: String;
    quantity: Number;
}