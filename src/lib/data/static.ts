import { IconOne, IconThree, IconTwo } from "@/ui/icons/services";

export const navigation = [
  {
    id: 1,
    label: "Vehicles List",
    href: "/vehicles",
  },
  {
    id: 2,
    label: "About Us",
    href: "/about",
  },
  {
    id: 3,
    label: "Services",
    href: "/services",
  },
  {
    id: 4,
    label: "Contact Us",
    href: "/contact",
  },
];

export const logos = [
  {
    id: 1,
    src: "/home-page/logo1.png",
    make: "maserati",
  },
  {
    id: 2,
    src: "/home-page/logo2.png",
    make: "ford",
  },
  {
    id: 3,
    src: "/home-page/logo3.png",
    make: "bmw",
  },
  {
    id: 4,
    src: "/home-page/logo4.png",
    make: "audi",
  },
  {
    id: 5,
    src: "/home-page/logo5.png",
    make: "kia",
  },
];

export const servicesCards = [
  {
    id: 1,
    title: "Ultrices",
    Icon: IconOne,
    body: "Nunc sed justo vulputate cursus scelerisque. Ipsum dolor netus ac magna diam felis aliquet nullam orci. Scelerisque nisi auctor sed accumsan nam aliquam pharetra at vitae. Dictum in risus risu",
  },
  {
    id: 2,
    title: "Laoreet",
    Icon: IconTwo,
    body: "Pretium quam ante dignissim leo non leo. Mi sed gravida auctor tristique. Molestie molestie sit varius lacus sollicitudin rhoncus massa. Pretium metus vel eget netus. Metus sit sapien lectus cursus felis a gravida.",
  },
  {
    id: 3,
    title: "Urnacos",
    Icon: IconThree,
    body: "Dolor risus nibh id nulla ullamcorper imperdiet enim tortor. Facilisi sapien convallis libero elementum dolor et. Felis sed ante facilisis nunc dolor lorem. Nunc felis in mus ullamcorper morbi. Et mauris mattis quam id velit.",
  },
];

export const VEHICLE_FILTERS = {
  priceFrom: [
    { value: "0", label: "€0" },
    { value: "10000", label: "€10.000" },
    { value: "20000", label: "€20.000" },
    { value: "30000", label: "€30.000" },
    { value: "50000", label: "€50.000" },
  ],

  priceTo: [
    { value: "10000", label: "€10.000" },
    { value: "20000", label: "€20.000" },
    { value: "30000", label: "€30.000" },
    { value: "50000", label: "€50.000" },
    { value: "50000+", label: "€50.000+" },
  ],

  mileageFrom: [
    { value: "0", label: "0 km" },
    { value: "50000", label: "50.000 km" },
    { value: "100000", label: "100.000 km" },
    { value: "150000", label: "150.000 km" },
  ],

  mileageTo: [
    { value: "50000", label: "50.000 km" },
    { value: "100000", label: "100.000 km" },
    { value: "150000", label: "150.000 km" },
    { value: "150000+", label: "150.000+ km" },
  ],
};
