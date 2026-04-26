import liquidDripImg1 from "../assets/images/liquidDrip1.webp";
import liquidDripImg2 from "../assets/images/liquidDrip2.webp";
export default function Skills() {
  return (
    <div className="bg-[#161f21] min-h-screen relative  p-20 ">
      <img
        src={liquidDripImg1}
        className="absolute w-140 -top-2 -left-4 select-none max-xl:w-100 max-lg:hidden"
        alt="liquidDripImg1"
      />
      <img
        src={liquidDripImg2}
        className="absolute w-140 -bottom-2 right-0  rotate-180 select-none max-xl:w-100 max-lg:hidden"
        alt="liquidDripImg1"
      />
      <img
        src={liquidDripImg1}
        className="absolute  w-140 -top-2 right-0 select-none max-xl:w-100 "
        alt="liquidDripImg1"
      />

      <img
        src={liquidDripImg2}
        className="absolute w-140 -bottom-2 -left-4 rotate-180 select-none max-xl:w-100 "
        alt="liquidDripImg1"
      />
      <h2 className="text-[180px] font-[PiecesNfi] text-[#ebe6dd] text-center mt-10 max-lg:text-9xl max-md:text-7xl max-sm:text-5xl">
        SKILLS
      </h2>
      <div className="flex gap-10 justify-center flex-wrap mt-20 mb-20 font-[AttackGraffiti]">
        <div className="box shadow-[8px_8px_0px_#ebe6dd] w-50 h-50 rounded p-4 bg-[#de3207]">
          <span className="flex justify-center items-center text-center  rounded size-full bg-[#fa5437] font-bold text-3xl p-2  max-md:text-2xl">
            ADOBE <br /> PREMIERE
          </span>
        </div>
        <div className="box shadow-[8px_8px_0px_#ebe6dd] w-50 h-50 rounded p-4 bg-[#de3207]">
          <span className="flex justify-center items-center text-center  rounded size-full bg-[#fa5437] font-bold text-3xl p-2 max-md:text-2xl">
            AFTER <br /> EFFECTS
          </span>
        </div>
        <div className="box shadow-[8px_8px_0px_#ebe6dd] w-50 h-50 rounded p-4 bg-[#de3207]">
          <span className="flex justify-center items-center text-center  rounded size-full bg-[#fa5437] font-bold text-4xl p-2 max-md:text-2xl">
            COLOR <br /> GRADING
          </span>
        </div>
        <div className="box shadow-[8px_8px_0px_#ebe6dd] w-50 h-50 rounded p-4 bg-[#de3207]">
          <span className="flex justify-center items-center text-center  rounded size-full bg-[#fa5437] font-bold text-4xl p-2 max-md:text-2xl">
            SOUND <br /> DESIGN
          </span>
        </div>
      </div>
      <p className="text-[#ebe6dd] text-3xl text-center">
        MASTERING THE TIMELINE
      </p>
    </div>
  );
}
