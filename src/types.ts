export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  icon: string; // lucide icon name
  benefits: string[];
  methodology: string;
  duration: string;
  price: string;
  recommendedTherapists: string[];
}

export interface Therapist {
  id: string;
  name: string;
  role: string;
  bio: string;
  detailedBio: string;
  imageUrl: string;
  specialties: string[];
  email: string;
  link: string;
  availability: string[];
}

export interface Testimonial {
  text: string;
  author: string;
}

export interface Booking {
  serviceId: string;
  therapistId: string;
  date: string;
  timeSlot: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes?: string;
}

export const SERVICES_DATA: Service[] = [
  {
    id: "individual",
    title: "Terapia Individual",
    shortDescription: "Un espacio íntimo y confidencial para trabajar en tus desafíos personales y fortalecer tu resiliencia.",
    longDescription: "La terapia individual es un proceso colaborativo entre el paciente y el terapeuta orientado a comprender y resolver dinámicas emocionales inconscientes o conductuales disfuncionales. Es ideal para tratar problemas de autoestima, transiciones de vida difíciles, trauma o autodescubrimiento profundo.",
    icon: "User",
    benefits: [
      "Mayor autoconocimiento y aceptación",
      "Desarrollo de estrategias saludables de afrontamiento",
      "Sanación de heridas emocionales y traumas del pasado",
      "Claridad en la toma de decisiones vitales"
    ],
    methodology: "Sesiones de 50 minutos con orientación humanista o cognitivo-conductual, adaptadas al ritmo y metas específicas del paciente.",
    duration: "50 min por sesión",
    price: "$65 USD",
    recommendedTherapists: ["sonbre-kola", "elena-marin"]
  },
  {
    id: "parejas",
    title: "Terapia de Pareja",
    shortDescription: "Herramientas de comunicación y resolución de conflictos para fortalecer el vínculo y construir una relación saludable.",
    longDescription: "Un enfoque terapéutico diseñado para parejas que desean mejorar la comunicación, resolver conflictos destructivos, recuperarse de infidelidades o simplemente reconectarse a un nivel íntimo y afectivo profundo. Promueve un espacio neutral y empático.",
    icon: "Heart",
    benefits: [
      "Comprensión de los patrones repetitivos de conflicto",
      "Fomento de un diálogo honesto, seguro y sin juicios",
      "Reconstrucción de la confianza y el afecto mutuos",
      "Herramientas concretas de negociación diaria"
    ],
    methodology: "Sesiones conjuntas de 60 minutos con tareas prácticas inter-sesión basadas en el enfoque sistémico y de apego emocional.",
    duration: "60 min por sesión",
    price: "$80 USD",
    recommendedTherapists: ["julian-rivas"]
  },
  {
    id: "juvenil",
    title: "Terapia Juvenil",
    shortDescription: "Acompañamiento especializado para adolescentes en su proceso de desarrollo, identidad y gestión emocional.",
    longDescription: "La adolescencia es un período de intensas trasformaciones hormonales, sociales y neurológicas. Nuestro acompañamiento está diseñado para que los jóvenes exploren sus ansiedades, definan su identidad de manera segura, canalicen su frustración y fortalezcan sus lazos con el entorno escolar y familiar.",
    icon: "Smile",
    benefits: [
      "Canalización saludable de emociones intensas",
      "Fortalecimiento de la autoestima y autoimagen",
      "Mejora en las relaciones familiares y escolares",
      "Herramientas para lidiar con el bullying y la presión social"
    ],
    methodology: "Enfoque clínico lúdico y de conversación activa para adolescentes de 12 a 18 años, con sesiones de retroalimentación parental periódicas.",
    duration: "50 min por sesión",
    price: "$65 USD",
    recommendedTherapists: ["elena-marin"]
  },
  {
    id: "ansiedad",
    title: "Manejo de Ansiedad",
    shortDescription: "Estrategias prácticas y terapéuticas para regular el estrés, reducir la ansiedad y recuperar la calma interior.",
    longDescription: "La ansiedad persistente paraliza y desgasta físicamente. Este tratamiento enfocado brinda técnicas basadas en evidencia científica de neurobiología y terapia de aceptación y compromiso (ACT), ayudando al cuerpo y la mente a regresar a su estado basal de paz.",
    icon: "Activity",
    benefits: [
      "Identificación temprana de disparadores somáticos",
      "Ejercicios prácticos de biofeedback y respiración diafragmática",
      "Desactivación de pensamientos catastróficos recurrentes",
      "Capacidad para actuar con calma en situaciones de alto estrés"
    ],
    methodology: "Tratamiento estructurado de 8 a 12 sesiones con metodologías de relajación, reestructuración cognitiva y mindfulness integrativo.",
    duration: "50 min por sesión",
    price: "$70 USD",
    recommendedTherapists: ["sonbre-kola", "elena-marin"]
  },
  {
    id: "orientacion",
    title: "Orientación Emocional",
    shortDescription: "Asesoramiento puntual para la toma de decisiones difíciles y el manejo de crisis circunstanciales en la vida diaria.",
    longDescription: "A veces no se requiere un proceso terapéutico a largo plazo, sino un punto de apoyo profesional inmediato para resolver un dilema laboral, un duelo reciente, una separación o un bloqueo existencial pasajero. Brinda claridad en momentos de niebla mental.",
    icon: "Lightbulb",
    benefits: [
      "Claridad objetiva frente a decisiones cruciales",
      "Desahogo controlado y validación profesional inmediata",
      "Plan de acción personalizado para el autocuidado",
      "Reducción del agobio existencial ante crisis imprevistas"
    ],
    methodology: "Consultoría focalizada de 1 a 3 sesiones estructuradas donde se definen prioridades y se delinean alternativas realistas.",
    duration: "45 min por sesión",
    price: "$55 USD",
    recommendedTherapists: ["julian-rivas", "sonbre-kola"]
  },
  {
    id: "grupal",
    title: "Terapia de Grupo",
    shortDescription: "Encuentros grupales guiados para compartir experiencias y encontrar apoyo mutuo en un entorno de respeto y empatía.",
    longDescription: "Sentir que somos los únicos con un problema es un gran peso. La terapia grupal reúne a personas que enfrentan retos similares bajo la facilitación de terapeutas expertos, creando un espejo terapéutico único cargado de compasión, solidaridad y aprendizaje interpersonal.",
    icon: "Users",
    benefits: [
      "Disminución profunda del sentimiento de soledad",
      "Retroalimentación diversa, honesta y empática",
      "Aceleración del crecimiento a través de espejos emocionales",
      "Desarrollo de habilidades sociales y asertividad"
    ],
    methodology: "Círculos terapéuticos semanales de 90 minutos con cupo máximo de 8 personas, organizados por temáticas específicas (duelo, ansiedad, autoestima).",
    duration: "90 min por sesión",
    price: "$35 USD",
    recommendedTherapists: ["julian-rivas", "sonbre-kola"]
  }
];

export const THERAPISTS_DATA: Therapist[] = [
  {
    id: "Sofia-Peña",
    name: "Sofia Peña",
    role: "Directora Clínica y Psicóloga Senior",
    bio: "Especialista en Terapia Cognitivo-Conductual con más de 12 años acompañando procesos de ansiedad y depresión.",
    detailedBio: "Sofia Peña es cofundadora de Coral Centro de Psicología. Cuenta con una Maestría en Psicología Clínica y de la Salud por la Universidad Nacional, certificada en Terapias de Tercera Generación. Su enfoque se centra en proporcionar soluciones estructuradas y basadas en evidencia científica para que los pacientes retomen el control sobre sus pensamientos y emociones de manera autónoma y compasiva.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-8ACve0Wv7tJTRzMLx8o36bV00GSBKZH8m00OrsLaQDW5izYjFQyNPzPTJRdjFuawX4xcjCZt7ZysXUgWTIB8PzluflvO3RiUaZwtTI6oTZ4AQw8vqN8ieHj0DtIx_916COOVAofGQOiLMqZanlVfOc3X5o4KPlcM7NdmNR6srrS0jcJyJswK6WaGFAC2dFg4eI0z0IZcimOfi8YSx7JShj-h_uXQHDUQqL6sT3lsauFUX2SEjjDsKqtsykbF8oNLKKEUNlDuNbk",
    specialties: ["Terapia Cognitivo-Conductual", "Ansiedad y Estrés", "Depresión Mayor", "Mindfulness"],
    email: "Sofia.peña@coral.com",
    link: "linkedin.com/in/Sofia-Peña-psico",
    availability: ["Lunes 09:00 - 14:00", "Miércoles 15:00 - 19:00", "Viernes 09:00 - 14:00"]
  },
  {
    id: "julian-rivas",
    name: "Dr. Julián Rivas",
    role: "Especialista en Terapia de Pareja",
    bio: "Enfocado en restaurar la comunicación y los vínculos emocionales a través de enfoques sistémicos y humanistas.",
    detailedBio: "El Dr. Julián Rivas obtuvo su doctorado en Psicología de la Familia y de los Sistemas Humanos. Cuenta con una trayectoria destacada de más de 9 años como terapeuta de relaciones y mediador familiar. Su terapia proporciona herramientas profundas de inteligencia emocional para que las parejas renegocien sus pactos, desbloqueen resentimientos estancados y reactiven la ternura y admiración recíprocas.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBdUJOGcTg-5cr6Q7ef8Vi0v8_AHbC19kzpCzhTHXzXN9AGgXl-YZIuLPFr9jtTsjiLiGQh07qU6sxzGnEz5Hy15yKXBzbfsJ2wv92AYN3eEFuBRW3QiWFRk4XroDiHUM2Q0QeVxqDD3fPu1l2BHsMqxJ69Gi0BVA4JqCSYIZj6eCXpdLFbwsbjZwr6xNj-U3LeL5OWqRKJQZSDRWxOMyRI4K1tepBlxXCG1X_BmGPqpgTYSdFOiL1gSfZ3QeERzjn-msdJZODNqJY",
    specialties: ["Terapia de Pareja", "Enfoque Sistémico", "Mediación en Crisis de Separación", "Vínculos de Apego"],
    email: "julian.rivas@coral.com",
    link: "linkedin.com/in/julian-rivas-fam",
    availability: ["Martes 10:00 - 18:00", "Jueves 10:00 - 18:00", "Sábado 09:00 - 13:00"]
  },
  {
    id: "elena-marin",
    name: "Lic. Elena Marín",
    role: "Psicóloga Infanto-Juvenil",
    bio: "Experta en desarrollo evolutivo y manejo emocional en niños y adolescentes mediante técnicas lúdicas.",
    detailedBio: "La Licenciada Elena Marín es graduada con Honores en Psicología del Desarrollo y Educación. Es apasionada de ayudar a niños y jóvenes a expresarse sin miedos en momentos de ruptura familiar, autismo leve, hiperactividad o retos académicos. Su consulta es un espacio activo donde el juego, el dibujo y las metáforas creativas sirven de puente para sanar tensiones invisibles.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAv2xo2hBpnqEenIIRl_oHtliLuhQKW5fsG-sahRmcKNcmL47mBqXZErx2TTz3CNXeVTpwa2cI6aD_vD2E2l47D_Qk8OByN3L0Djy5C-czLaFPiSC_-hie5r_qpeYizFEqbNVUN15bbRcaxjN4eTXbLl_G6tFUr70m-Lt_ZqpGvTyBBt7YplFo7TtWRYInETeYuPiLyN9MvE3_BR7L4DMssXpQvuST7sl_93F_dBUVaQfq1sKOWLZIzSHnaqY8RYDFGYEb-Mp03538",
    specialties: ["Psicología Infantil", "Trastornos de Ansiedad en Adolescentes", "Orientación Educativa", "Arteterapia"],
    email: "elena.marin@coral.com",
    link: "linkedin.com/in/elena-marin-dev",
    availability: ["Lunes 14:00 - 19:00", "Martes 14:00 - 19:00", "Sábado 09:00 - 14:00"]
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    text: "Encontrar a Coral fue un cambio de vida. La calidez del espacio y la profesionalidad de mi terapeuta me ayudaron a superar una etapa muy difícil de ansiedad.",
    author: "Elena M., Paciente"
  },
  {
    text: "Excelente acompañamiento. Me sentí escuchado y validado desde la primera sesión. El ambiente es realmente tranquilo y profesional.",
    author: "Roberto G., Paciente"
  },
  {
    text: "Recomiendo ampliamente las sesiones individuales. He aprendido herramientas de manejo emocional que utilizo a diario para mi bienestar integral.",
    author: "Sofía L., Paciente"
  }
];
