type Props = {
  identifier: string;
};

export default function BookReader({ identifier }: Props) {
  return (
    <iframe
      src={`https://archive.org/embed/${identifier}`}
      width='100%'
      height='600'
      allowFullScreen
      className='rounded border'
    />
  );
}
