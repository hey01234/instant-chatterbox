interface MessageProps {
  text: string;
  sent: boolean;
}

const Message = ({ text, sent }: MessageProps) => {
  return (
    <div className={`flex ${sent ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] p-3 rounded-2xl animate-message-in ${
          sent ? "bg-chat-sent" : "bg-chat-received"
        }`}
      >
        <p className="text-sm">{text}</p>
      </div>
    </div>
  );
};

export default Message;