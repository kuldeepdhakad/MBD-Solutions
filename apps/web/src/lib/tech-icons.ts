/** Official technology logos via devicon CDN. */

const devicon = (path: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}`;

export type TechIcon = { name: string; slug: string; icon: string; category?: string };

export const TECH_STACK: TechIcon[] = [
  { name: "Java", slug: "java", icon: devicon("java/java-original.svg"), category: "Backend" },
  { name: "Spring Boot", slug: "spring", icon: devicon("spring/spring-original.svg"), category: "Backend" },
  { name: "Node.js", slug: "nodejs", icon: devicon("nodejs/nodejs-original.svg"), category: "Backend" },
  { name: "React", slug: "react", icon: devicon("react/react-original.svg"), category: "Frontend" },
  { name: "Next.js", slug: "nextjs", icon: devicon("nextjs/nextjs-original.svg"), category: "Frontend" },
  { name: "Angular", slug: "angular", icon: devicon("angular/angular-original.svg"), category: "Frontend" },
  { name: "Flutter", slug: "flutter", icon: devicon("flutter/flutter-original.svg"), category: "Mobile" },
  { name: "MongoDB", slug: "mongodb", icon: devicon("mongodb/mongodb-original.svg"), category: "Database" },
  { name: "PostgreSQL", slug: "postgresql", icon: devicon("postgresql/postgresql-original.svg"), category: "Database" },
  { name: "MySQL", slug: "mysql", icon: devicon("mysql/mysql-original.svg"), category: "Database" },
  { name: "Docker", slug: "docker", icon: devicon("docker/docker-original.svg"), category: "DevOps" },
  { name: "Kubernetes", slug: "kubernetes", icon: devicon("kubernetes/kubernetes-plain.svg"), category: "DevOps" },
  { name: "AWS", slug: "aws", icon: devicon("amazonwebservices/amazonwebservices-plain-wordmark.svg"), category: "Cloud" },
  { name: "Azure", slug: "azure", icon: devicon("azure/azure-original.svg"), category: "Cloud" },
  { name: "Google Cloud", slug: "gcp", icon: devicon("googlecloud/googlecloud-original.svg"), category: "Cloud" },
  { name: "Redis", slug: "redis", icon: devicon("redis/redis-original.svg"), category: "Database" },
  { name: "Kafka", slug: "kafka", icon: devicon("apachekafka/apachekafka-original.svg"), category: "Messaging" },
  { name: "RabbitMQ", slug: "rabbitmq", icon: devicon("rabbitmq/rabbitmq-original.svg"), category: "Messaging" },
  { name: "GitHub", slug: "github", icon: devicon("github/github-original.svg"), category: "Tools" },
  { name: "Git", slug: "git", icon: devicon("git/git-original.svg"), category: "Tools" },
  { name: "Jenkins", slug: "jenkins", icon: devicon("jenkins/jenkins-original.svg"), category: "DevOps" },
  { name: "Linux", slug: "linux", icon: devicon("linux/linux-original.svg"), category: "DevOps" },
  { name: "Firebase", slug: "firebase", icon: devicon("firebase/firebase-plain.svg"), category: "Cloud" },
  { name: "Elasticsearch", slug: "elasticsearch", icon: devicon("elasticsearch/elasticsearch-original.svg"), category: "Database" },
  { name: "TypeScript", slug: "typescript", icon: devicon("typescript/typescript-original.svg"), category: "Frontend" },
  { name: "Python", slug: "python", icon: devicon("python/python-original.svg"), category: "Backend" },
];

export function resolveTechIcon(name: string, slug?: string): string {
  const key = (slug || name).toLowerCase().replace(/\s+/g, "-").replace(/\./g, "");
  const found = TECH_STACK.find(
    (t) => t.slug === key || t.name.toLowerCase() === name.toLowerCase(),
  );
  return found?.icon ?? TECH_STACK[0].icon;
}
