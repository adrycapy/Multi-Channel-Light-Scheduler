import { MultichannelSchedulerCard } from "./multichannel-card";
import "./editor";

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "multichannel-scheduler-card",
  name: "Multichannel Light Scheduler",
  description: "Interactive 24h reef light schedule with up to 10 channels",
  preview: true,
});

console.info("Multichannel Scheduler card loaded", MultichannelSchedulerCard.name);
