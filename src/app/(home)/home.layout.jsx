import HomeHeader from '@/components/home/home.header'

export default function HomeLayout({children}) {
  return (
    <div>
      <HomeHeader />
      {children}
    </div>
  )
}
