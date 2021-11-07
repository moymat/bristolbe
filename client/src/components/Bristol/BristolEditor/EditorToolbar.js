import { Quill } from "react-quill";
import quillEmoji from 'quill-emoji';
import 'react-quill/dist/quill.snow.css';
import "quill-emoji/dist/quill-emoji.css";
import ImageResize from 'quill-image-resize-module-react';
import { ImageDrop } from 'quill-image-drop-module';
import MagicUrl from 'quill-magic-url'

//image handler
Quill.register('modules/imageDrop', ImageDrop);
Quill.register('modules/magicUrl', MagicUrl)
//Add emoji
const { EmojiBlot, ShortNameEmoji, ToolbarEmoji, TextAreaEmoji } = quillEmoji;

Quill.register({
  'formats/emoji': EmojiBlot,
  'modules/emoji-shortname': ShortNameEmoji,
  'modules/emoji-toolbar': ToolbarEmoji,
  'modules/emoji-textarea': TextAreaEmoji
}, true);
//Add image resize
Quill.register('modules/imageResize', ImageResize);


// Modules object for setting up the Quill editor
export const modules = {
  toolbar: [
    [{ 'font': [] }, { 'header': [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'align': [] }],
    ['link', 'image'],
    ['clean'],
    ['emoji'],
  ],
  'emoji-toolbar': true,
  "emoji-textarea": false,
  "emoji-shortname": true,
  imageResize: {
    parchment: Quill.import('parchment'),
    modules: ['Resize', 'DisplaySize']
  },
  imageDrop: true,
  magicUrl: true,
}

// Formats objects for setting up the Quill editor
export const formats = ['font', 'header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block', 'color', 'background', 'list', 'indent', 'align', 'link', 'image', 'clean', 'emoji']
