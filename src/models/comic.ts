interface Serializable<T> {
    deserialize(input: Object): T;
}

export class ComicDataWrapper implements Serializable<ComicDataWrapper> {
	code: number;
	status: string;
	copyright: string;
	attributionText: string;
	attributionHTML: string;
	data: ComicDataContainer;
	etag: string;

	deserialize(input) {
		this.code = input.code;
		this.status = input.status;
		this.copyright = input.copyright;
		this.attributionText = input.attributionText;
		this.attributionHTML = input.attributionHTML;
		this.data = new ComicDataContainer().deserialize(input.data);
		this.etag = input.etag;
		return this;
	}
}

export class ComicDataContainer implements Serializable<ComicDataContainer> {
	offset: number;
	limit: number;
	total: number;
	count: number;
	results: Comic[];

	deserialize(input) {
		this.offset = input.offset;
		this.limit = input.limit;
		this.total = input.total;
		this.count = input.count;
		this.results = input.results.map(result => new Comic().deserialize(result));
		return this;
	}
}

export class Comic implements Serializable<Comic> {
	id: number;
	digitalId: number;
	title: string;
	issueNumber: number;
	variantDescription: string;
	description: string;
	modified: string;
	isbn: string;
	upc: string;
	diamondCode: string;
	ean: string;
	issn: string;
	format: string;
	pageCount: string;
	textObjects: TextObject[];
	resourceURI: string;
	urls: Url[];
	series: SeriesSummary;
	variants: ComicSummary[];
	collections: ComicSummary[];
	collectedIssues: ComicSummary[];
	dates: ComicDate[];
	prices: ComicPrice[];
	thumbnail: Image;
	images: Image[];
	creators: CreatorList;
	characters: CharacterList;
	stories: StoryList;
	events: EventList;

	deserialize(input) {
		this.id = input.id;
		this.digitalId = input.digitalId;
		this.title = input.title;
		this.issueNumber = input.issueNumber;
		this.variantDescription = input.variantDescription;
		this.description = input.description;
		this.modified = input.modified;
		this.isbn = input.isbn;
		this.upc = input.upc;
		this.diamondCode = input.diamondCode;
		this.ean = input.ean;
		this.issn = input.issn;
		this.format = input.format;
		this.pageCount = input.pageCount;
		this.dates = input.dates.map(date => new ComicDate().deserialize(date));
		this.thumbnail = new Image().deserialize(input.thumbnail);
		this.characters = new CharacterList().deserialize(input.characters);
		this.series = new SeriesSummary().deserialize(input.series);
		this.prices = input.prices.map(price => new ComicPrice().deserialize(price));
		return this;
	}
}

export class TextObject {
	type: string;
	language: string;
	text: string;
}
export class Url {
	type: string;
	url: string;
}

export class SeriesSummary implements Serializable<SeriesSummary> {
	resourceURI: string;
	name: string;

	deserialize(input) {
		this.resourceURI = input.resourceURI;
		this.name = input.name;
		return this;
	}
}

export class ComicSummary {
	resourceURI: string;
	name: string;
}

export class ComicDate implements Serializable<ComicDate> {
	type: string;
	date: Date;

	deserialize(input) {
		this.type = input.type;
		this.date = new Date(input.date);
		return this;
	}

	showDate(): string{
		return this.date.toISOString().substring(0, 10);
	}
}

export class ComicPrice implements Serializable<ComicPrice> {
	type: string;
	price: number;

	deserialize(input) {
		this.type = input.type;
		this.price = input.price;
		return this;
	}

	typeToText(): string {
		if(this.type == "printPrice") {
			return "Precio impreso";
		}
		if(this.type == "digitalPrice") {
			return "Precio digital";
		}
	}
}

export class Image implements Serializable<Image> {
	path: string;
	extension: string;

	deserialize(input) {
		this.path = input.path;
		this.extension = input.extension;
		return this;
	}
}

export class CreatorList {
	available: number;
	returned: number;
	collectionURI: string;
	items: CreatorSummary[];
}

export class CreatorSummary {
	resourceURI: string;
	name: string;
	role: string;
}

export class CharacterList implements Serializable<CharacterList> {
	available: number;
	returned: number;
	collectionURI: string;
	items: CharacterSummary[];

	deserialize(input){
		this.available = input.available;
		this.returned = input.returned;
		this.collectionURI = input.collectionURI;
		this.items = input.items.map(item => new CharacterSummary().deserialize(item));
		return this;
	}
}

export class CharacterSummary implements Serializable<CharacterSummary> {
	resourceURI: string;
	name: string;
	role: string;

	deserialize(input){
		this.resourceURI = input.resourceURI;
		this.name = input.name;
		this.role = input.role;
		return this;
	}
}

export class StoryList {
	available: number;
	returned: number;
	collectionURI: string;
	items: StorySummary[];
}

export class StorySummary {
	resourceURI: string;
	name: string;
	type: string;
}

export class EventList {
	available: number;
	returned: number;
	collectionURI: string;
	items: EventSummary[];
}

export class EventSummary {
	resourceURI: string;
	name: string;
}