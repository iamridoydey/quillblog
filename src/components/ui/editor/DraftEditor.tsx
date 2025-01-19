import { useEffect, useRef, useState, useCallback } from "react";
import { Editor, EditorState, Modifier } from "draft-js";
import { EmojiPayload } from "./interfaces";

export default function DraftEditor({ emoji }: { emoji: EmojiPayload }) {
  const [lastEmojiTimestamp, setLastEmojiTimestamp] = useState<Date | null>(
    null
  );
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [isClient, setIsClient] = useState(false); // State to ensure client-side rendering

  const editor = useRef<Editor | null>(null);

  // Focus editor when mounted
  const focusEditor = useCallback(() => {
    editor.current?.focus();
  }, []);

  // Memoized insert emoji function
  const insertEmoji = useCallback(
    (emojiToInsert: string) => {
      const currentContent = editorState.getCurrentContent();
      const selection = editorState.getSelection();

      // Insert the emoji at the current selection
      const newContent = Modifier.insertText(
        currentContent,
        selection,
        emojiToInsert
      );
      const newEditorState = EditorState.push(
        editorState,
        newContent,
        "insert-characters"
      );
      setEditorState(newEditorState);
    },
    [editorState]
  );

  useEffect(() => {
    setIsClient(true); // Set the flag to true after the component mounts
  }, []);

  useEffect(() => {
    focusEditor();
  }, [focusEditor]);

  // Trigger emoji insertion only when the emoji changes
  useEffect(() => {
    if (
      emoji.timestamp &&
      (!lastEmojiTimestamp || emoji.timestamp > lastEmojiTimestamp)
    ) {
      insertEmoji(emoji.value);
      setLastEmojiTimestamp(emoji.timestamp);
    }
  }, [lastEmojiTimestamp, emoji.timestamp, emoji.value, insertEmoji]);

  const isEmpty = !editorState.getCurrentContent().hasText();

  // Ensure this component is rendered only on the client side
  if (!isClient) return null;

  return (
    <div
      onClick={focusEditor}
      className="relative w-full mb-2 p-2 border-gray-300 rounded-md cursor-text min-h-10 max-h-[480px] overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700"
    >
      {isEmpty && (
        <div className="absolute top-2 left-2 text-gray-400 pointer-events-none">
          What&apos;s on your mind?
        </div>
      )}
      <Editor
        ref={editor}
        editorState={editorState}
        onChange={setEditorState}
      />
    </div>
  );
}
