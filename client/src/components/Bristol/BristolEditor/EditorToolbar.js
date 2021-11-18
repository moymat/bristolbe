import { Quill } from "react-quill";
import quillEmoji from "quill-emoji";
import "react-quill/dist/quill.snow.css";
import "quill-emoji/dist/quill-emoji.css";
import { ImageDrop } from "quill-image-drop-module";
import MagicUrl from "quill-magic-url";
import BlotFormatter from "quill-blot-formatter";
/* {
	AlignAction,
	DeleteAction,
	ImageSpec,
} */
import VideoResize from "quill-video-resize-module2";
//video resize
Quill.register("modules/VideoResize", VideoResize);
//image handler
Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/magicUrl", MagicUrl);
//Add emoji
const { EmojiBlot, ShortNameEmoji, ToolbarEmoji, TextAreaEmoji } = quillEmoji;

Quill.register(
	{
		"formats/emoji": EmojiBlot,
		"modules/emoji-shortname": ShortNameEmoji,
		"modules/emoji-toolbar": ToolbarEmoji,
		"modules/emoji-textarea": TextAreaEmoji,
	},
	true
);
//Add image resize
Quill.register("modules/blotFormatter", BlotFormatter);
//toresizing support only images
/* class CustomImageSpec extends ImageSpec {
	getActions() {
		return [AlignAction, DeleteAction];
	}
} */
// By default the Image format of quill does not allow alignments.  To solve the issue, the default Image class can be extended:
const Image = Quill.import("formats/image"); // Had to get the class this way, instead of ES6 imports, so that quill could register it without errors

const ATTRIBUTES = [
	"alt",
	"height",
	"width",
	"class",
	"style", // Had to add this line because the style was inlined
];

class CustomImage extends Image {
	static formats(domNode) {
		return ATTRIBUTES.reduce((formats, attribute) => {
			const copy = { ...formats };

			if (domNode.hasAttribute(attribute)) {
				copy[attribute] = domNode.getAttribute(attribute);
			}

			return copy;
		}, {});
	}

	format(name, value) {
		if (ATTRIBUTES.indexOf(name) > -1) {
			if (value) {
				this.domNode.setAttribute(name, value);
			} else {
				this.domNode.removeAttribute(name);
			}
		} else {
			super.format(name, value);
		}
	}
}

Quill.register({
	// ... other formats
	"formats/image": CustomImage,
});

// Modules object for setting up the Quill editor
export const modules = {
	toolbar: [
		[{ header: [] }],
		["bold", "italic", "underline", "strike", "blockquote", "code-block"],
		[{ color: [] }, { background: [] }],
		[
			{ list: "ordered" },
			{ list: "bullet" },
			{ indent: "-1" },
			{ indent: "+1" },
		],
		[{ align: [] }],
		["link", "image", "video"],
		["clean"],
		["emoji"],
	],
	"emoji-toolbar": true,
	"emoji-textarea": false,
	"emoji-shortname": true,
	blotFormatter: {
		// specs: [CustomImageSpec],
	},
	VideoResize: {
		modules: ["Resize", "DisplaySize", "Toolbar"],
		tagName: "iframe", // iframe | video
	},
	imageDrop: true,
	magicUrl: true,
};

// Formats objects for setting up the Quill editor
export const formats = [
	"header",
	"bold",
	"italic",
	"underline",
	"strike",
	"blockquote",
	"code-block",
	"color",
	"background",
	"list",
	"indent",
	"align",
	"link",
	"image",
	"clean",
	"emoji",
	"size",
	"code",
	"script",
	"width",
	"height",
	"top",
	"left",
	"right",
	"bottom",
	"float",
	"inline",
	"margin",
	"display",
	"data-align",
	"style",
	"direction",
	"video",
	"class",
];
