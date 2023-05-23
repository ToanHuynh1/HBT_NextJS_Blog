import Image from 'next/image'
import classes from './page.module.css'
import { blogs } from '@/lib/data'
import BlogCard from '@/components/blodCard/BlogCard'

export default function Home() {

  return (
    <div className={classes.container}>
      <h2>DEV-HBT</h2>
      <div className={classes.wrapper}>
        {blogs.map((blog, index) => (
          <BlogCard key={blog.title} blog={blog}/>
        ))}
      </div>
    </div>
  )
}
