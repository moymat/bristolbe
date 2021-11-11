import { Quill } from "react-quill";
import quillEmoji from "quill-emoji";
import "react-quill/dist/quill.snow.css";
import "quill-emoji/dist/quill-emoji.css";
import { ImageDrop } from "quill-image-drop-module";
import MagicUrl from "quill-magic-url";
import BlotFormatter from 'quill-blot-formatter';
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
Quill.register('modules/blotFormatter', BlotFormatter);


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
		// see config options below
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
];
