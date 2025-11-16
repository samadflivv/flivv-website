// components/GVHerotop.jsx
import AnimatedBTN from "./AnimatedBTN";

export default function GVHerotop() {
  return (
    <div className="relative w-full overflow-hidden bg-[#03050B]">
      {/* Background Glow Effect - Visible on both layouts */}
      <div className="absolute bottom-2 right-1/4 w-80 h-60 bg-[#E509EF] rounded-full filter blur-3xl"></div>
      
      {/* Mobile Layout - Only shows on screens < 768px */}
      <div className="md:hidden flex flex-col py-12 px-4">
        {/* Centered Titles with Enhanced Visibility */}
        <div className="flex flex-col items-center mb-6 relative z-20">
          <h1 
            className="text-6xl font-light uppercase tracking-wider text-white leading-[0.85] text-center"
            // style={{ textShadow: '0 0 15px rgba(255,255,255,0.4)' }}
          >
            Gulmohar
          </h1>
          <h1 
            className="text-6xl font-light uppercase tracking-wider text-white leading-[0.85] text-center mt-2"
            // style={{ textShadow: '0 0 15px rgba(255,255,255,0.4)' }}
          >
            Villas
          </h1>
        </div>
        
        {/* Image */}
        <div className="w-full my-6 rounded-xl overflow-hidden flex justify-center">
          <img 
            src="/GVtinyimg.png" 
            alt="Gulmohar Villas" 
            className="h-full object-cover z-10"
          />
        </div>
        
        {/* Button and Services in Single Line */}
        <div className="w-full flex items-center justify-between mt-4 z-20">
          <div className="scale-110">
            <AnimatedBTN />
          </div>
          
          <div className="pt-6 text-right text-sm tracking-wider uppercase text-white space-y-1 font-medium">
            <p>SHADNAGAR</p>
            <p>HMDA APPROVED</p>
            <p>VILLA PLOT PROJECT</p>
          </div>
        </div>
      </div>
      
      {/* Desktop Layout - Exactly as you provided - Only shows on screens >= 768px */}
      <div className="hidden md:block relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-3 grid-rows-2">
          {/* Row 1: Top Section */}
          <div className="flex items-end">
            <h1 className="text-[14vw] md:text-[130px] font-light uppercase tracking-wider text-white leading-[0.85]">
              Gulmohar
            </h1>
          </div>
          
          <div className="">
            <img src="/GVtinyimg.png" alt="" className="relative w-[400px] h-[100px] ml-85 mt-18 rounded-xl"/>
          </div>  
          
          <div className="flex items-start justify-end mt-18">
            <div className="text-right text-sm tracking-wider uppercase text-white/80">
              {/* Empty */}
            </div>
          </div>
          
          {/* Row 2: Bottom Section */}
          <div className="flex items-end mb-10">
            <AnimatedBTN/>
          </div>
          
          <div className="flex items-end">
            <div className="text-right text-sm md:text-sm tracking-wider uppercase text-white/80 ml-25 mb-10">
            <p>SHADNAGAR</p>
            <p>HMDA APPROVED</p>
            <p>VILLA PLOT PROJECT</p>
            </div>
          </div>

          <div className="flex items-start justify-center">
            <h1 className="text-[14vw] md:text-[150px] font-light uppercase tracking-wider text-white leading-[0.85] mr-55">
              Villas
            </h1>
          </div>
        </div>
      </div>
      
      {/* Gradient Overlays - Visible on both layouts */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 md:w-1/3 h-45 bg-gradient-to-r from-[#03050B] to-transparent z-10"></div>
        <div className="absolute top-0 right-0 md:w-1/3 h-full bg-gradient-to-l from-[#03050B] to-transparent z-10"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/4 md:h-1/3 bg-gradient-to-t from-[#03050B] to-transparent z-10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(3,5,11,0.5)_0%,rgba(3,5,11,0.9)_70%)] z-0"></div>
      </div>
    </div>
  );
}