import Hero from "@components/Hero";
import DepartmentList from "@components/DepartmentList";

const Home = () => {
  return (
    <section className="w-full flex flex-col items-center justify-center gap-24 my-24">
      <Hero />
      <DepartmentList />
    </section>
  );
};

export default Home;
