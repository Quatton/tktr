export default function TopLayout(props: { children: React.ReactNode }) {
  return <><header className="fixed top-0 left-0 z-10 backdrop-blur-md border-b border-gray-800 w-full h-16 flex items-center px-4">
  <h1 className="text-2xl text-white font-bold">tktr</h1>
</header>
  {props.children}
  
</>
}