const [activeIndex, setActiveIndex] = useState(0);
  const images = [im1, im2, im3, im4, im5];

<div id="default-carousel" class="relative w-full" data-carousel="slide">
    <!-- Carousel wrapper -->
    <div className="relative hidden duration-700 ease-in-out mt-10 h-[500px] ml-[130px] w-[1250px] overflow-hidden flex justify-center items-center bg-black">
          {images.map((img, i) => (
          <img
            key={i}
            src={img}
            className={`absolute h-[500px] w-full max-w-full ${
            i === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            alt={`Slide ${i + 1}`}
          />
          ))}
        </div>

    <!-- Slider indicators -->
    <div class="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        <button type="button" class="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
        <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
        <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
        <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
        <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
    </div>
    <!-- Slider controls -->
    <div className="absolute top-[340px] left-[40px] z-30 flex items-center justify-center">
          <button
            onClick={handlePrev}
            className="flex items-center justify-center h-[50px] w-[50px] bg-[#003049] rounded-full group"
          >
            <ChevronLeftIcon className="w-[30px] h-[30px] text-white" strokeWidth={4.5} />
          </button>
        </div>
        <div className="absolute top-[340px] right-[40px] z-30 flex items-center justify-center">
          <button
            onClick={handleNext}
            className="flex items-center justify-center h-[50px] w-[50px] bg-[#003049] rounded-full group"
          >
            <ChevronRightIcon className="w-[30px] h-[30px] text-white" strokeWidth={4.5} />
          </button>
        </div>
</div>