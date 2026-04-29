import Image from "next/image";
import reportsData from "./carddata";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Reports = () => {
    return (
        <>
          <div data-particles-color="#696969" data-bg-color="#292929" className="min-h-screen flex flex-col items-center px-[120px] pt-[120px] pb-[80px]">
            {/* Header */}
            <div className="flex basis-1/3 w-full">
              <div className="font-bebas flex flex-col basis-1/2 uppercase text-[80px] leading-[96px]">
                <span className="text-[#F4F4F4]">Defining Moments from</span>
                <span className="text-[#F16F00]">the Professional Circuit</span>
              </div>
              <div className="flex flex-col items-end gap-1 basis-1/2 translate-y-[85px]">
                <span className="uppercase text-[#7F7F7F] text-[24px] leading-[36px]">DISCOVER report of OUR RIDERs</span>
                <div className="flex gap-1 items-center">
                  <span className="text-[#F16F00] text-[16px] leading-[24px]">Go to Reports Page</span>
                  <Image src={'/Images/hero/reports_bike.png'} width={50} height={28} className="hover:rotate-45 transition duration-500 power-in-out" alt="Reports bike icon" />
                </div>
              </div>
            </div>

            {/* Carousel */}
            <div className="basis-2/3 w-full mt-16">
              <Carousel
                opts={{ align: "start", loop: true }}
                className="w-full"
              >
                <CarouselContent className="-ml-6">
                  {reportsData.map((card, index) => (
                    <CarouselItem key={index} className="pl-6 md:basis-1/2 lg:basis-1/3">
                      <div className="flex flex-row h-[280px] bg-[#464646] overflow-hidden group cursor-pointer">
                        {/* Content Left */}
                        <div className="flex flex-col justify-center gap-3 p-6 flex-1 min-w-0">
                          <span className="text-[#9A9A9A] text-[12px]">{card.date}</span>
                          <h3 className="font-bebas text-[#F4F4F4] text-[20px] leading-[24px] uppercase">{card.title}</h3>
                          <p className="text-[#9A9A9A] text-[13px] leading-[20px] line-clamp-4">{card.description}</p>
                          <span className="text-[#F16F00] text-[13px] mt-1">Read more..</span>
                        </div>
                        {/* Image Right */}
                        <div className="relative w-[44%] shrink-0 overflow-hidden rounded-xl m-3">
                          <Image
                            src={card.image}
                            alt={card.title}
                            fill
                            className="object-cover group-hover:scale-105 transition duration-500 ease-in-out"
                          />
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex gap-3 mt-8 justify-end">
                  <CarouselPrevious className="static translate-y-0 bg-transparent border border-[#F16F00] text-[#F16F00] hover:bg-[#F16F00] hover:text-white rounded-none w-10 h-10 transition" />
                  <CarouselNext className="static translate-y-0 bg-transparent border border-[#F16F00] text-[#F16F00] hover:bg-[#F16F00] hover:text-white rounded-none w-10 h-10 transition" />
                </div>
              </Carousel>
            </div>
          </div>
        </>
    )
}

export default Reports;