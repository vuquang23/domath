<template>
    <div class="vh-100 select-category">
        <div class="heading">
            <h1 class="fw-bold" style="color: #1ab394">TRỢ LÝ HỌC TẬP 2SCHOLARSHIPS</h1>
            <h4 style="color: #1ab394">Học ít hiểu nhiều nhớ lâu hiệu quả</h4>
            <h4 class="fw-bold" style="color: #1ab394; margin-top: 1.8em;">Em hãy chọn bài học</h4>
        </div>
        <div class="container" style="margin-top: 2.5em;">
            <div class="row">
                <div class="col-6">
                  <router-link :to="`/tim-chuoi`">
                    <figure >
                        <img class="img-select item" src="@/assets/deco/tim-chuoi.jpg" />
                    </figure>
                  </router-link>
                </div>
                <div class="col-6">
                  <router-link :to="`doan-hinh`">
                    <figure>
                        <img class="img-select item" src="@/assets/deco/hinh-nao.jpg" />
                    </figure>
                  </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">

.heading {
    padding-top: 3.5em;
}

.select-category {
    background-image: linear-gradient(0deg, rgba(87, 95, 97, 0.7),rgba(239, 248, 248, 0.8)), url('../assets/deco/cover3.jpg');
    background-size: 100% 100%
}

.img-select {
    aspect-ratio: 1/1;
    width: 20em;
    box-shadow: 0.2em 0.2em 3px rgba(0, 0, 0, 0.2);
    cursor: pointer;
}

.item {
  align-items: center;
  background-color: #fff;
  border: 1px solid #eee;
  position: relative;
  z-index: 1000;
  img{
    object-fit: cover;
    height: 400px;
    width: 400px;
  }
  &::before, &::after {
    background-image: linear-gradient(-180deg, #A1DEFF 0%, #5EA3DB 97%);
    content: '';
    height: 100%;
    position: absolute;
    transition: all .2s;
    transition-delay: .2s;
    transform: translateY(0px) translateX(0px);
    width: 100%;
    z-index: -1;
  }
  &::after {
    background-image: linear-gradient(0deg, #FFCF70 0%, #FFAE3D 97%);
  }
  &:hover{
    animation-name: hoverPop;
    animation-duration: .4s;
    animation-fill-direction: forward;
    img{  
      box-shadow: 2px 2px 4px 0px rgba(10,12,15,0.27);
      box-shadow: 0px 0px 30px 0px rgba(10,12,15,0.27);
    }
    &::before{
      animation: slick-hover-2 3s .4s linear infinite;
      transform: translateY(-20px) translateX(-20px);
    }
    &::after{
      animation: slick-hover 3s .4s linear infinite reverse;
      transform: translateY(20px) translateX(20px);
    }
  }
}

@keyframes hoverPop {
  0%, 100% {
    transform: scale(1);
  }
  33% {
    transform: scale(1.05);
  }
  66% {
    transform: scale(.90);
  }
}

@keyframes slick-hover {
  0.00% {
    transform: translateY(20px) translateX(20px) }
  16.67% {
    transform: translateY(-13px) translateX(-9px) }
  33.33% {
    transform: translateY(4px) translateX(12px) }
  50.00% {
    transform: translateY(20px) translateX(-20px) }
  66.67% {
    transform: translateY(-3px) translateX(8px) }
  83.33% {
    transform: translateY(-15px) translateX(-11px) }
  100.00% {
    transform: translateY(20px) translateX(20px) }
}

@keyframes slick-hover-2 {
  0.00% {
    transform: translateY(-20px) translateX(-20px) }
  16.67% {
    transform: translateY(3px) translateX(-5px) }
  33.33% {
    transform: translateY(18px) translateX(-10px) }
  50.00% {
    transform: translateY(-20px) translateX(20px) }
  66.67% {
    transform: translateY(15px) translateX(-4px) }
  83.33% {
    transform: translateY(-1px) translateX(15px) }
  100.00% {
    transform: translateY(-20px) translateX(-20px) }
}

</style>