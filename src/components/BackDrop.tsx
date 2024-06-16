export default function BackDrop({ pending }: { pending: boolean }) {
  return (
    <div
      className={`fixed z-30 inset-0 bg-black/80 transition-all ${
        pending ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    ></div>
  );
}
