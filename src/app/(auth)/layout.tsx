type LayoutProp = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: LayoutProp) {
  return <main className='w-full min-h-screen px-6 mx-auto flex-center transition-all lg:px-16 min-[1300px]:px-0'>{children}</main>;
}
