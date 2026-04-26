import instaImg from "../assets/images/insta.webp";
import tikImg from "../assets/images/tik.webp";
import linkedinImg from "../assets/images/likedin.webp";
export default function Contact() {
  return (
    <div className="min-h-screen bg-[#ebe6dd] p-10 pt-20">
      <h2 className="text-7xl md:text-9xl lg:text-[200px] font-[PiecesNfi] text-center mt-10">
        LET'S CONTACT
      </h2>
      <div className="flex mt-40 justify-evenly gap-10 flex-wrap">
        <a href="https://www.instagram.com/abn_s0bhy" target="_blank">
          <div className="border-3 p-3 pb-10 shadow-[-8px_8px_0px_#e0482d]">
            <div className="bg-[#ebe6dd] border-3">
              <img src={instaImg} alt="instaImg" className="w-full md:w-70" />
            </div>
          </div>
        </a>
        <a href="https://www.tiktok.com/@youssef_s0bhy" target="_blank">
          <div className="border-3 p-3 pb-10 shadow-[-8px_8px_0px_#e0482d]">
            <div className="bg-[#ebe6dd] border-3">
              <img src={tikImg} alt="tikImg" className="w-full md:w-70" />
            </div>
          </div>
        </a>
        <a href="https://www.linkedin.com/in/youssef-s0bhy" target="_blank">
          <div className="border-3 p-3 pb-10 shadow-[-8px_8px_0px_#e0482d]">
            <div className="bg-[#ebe6dd] border-3">
              <img
                src={linkedinImg}
                alt="linkedinImg"
                className="w-full md:w-70"
              />
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
