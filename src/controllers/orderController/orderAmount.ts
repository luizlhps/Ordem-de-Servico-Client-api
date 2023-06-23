import { serviceModel, servicePrice } from "../../models/Service.model";

class OrderServicePrice {
  public async calculate(orderId: string, services: any): Promise<number> {
    let amount = 0;

    console.log(orderId, services);

    services.forEach(async (serviceId: string) => {
      const currentService = await serviceModel.findById(serviceId);
      if (!currentService) throw new Error("Serviço não encontrado");

      await this.updateServicePrice(orderId, serviceId, currentService.amount, services.length);

      return (amount += currentService.amount);
    });
    return amount;
  }

  private async updateServicePrice(
    orderId: string,
    serviceId: string,
    currentServicePrice: number,
    servicesQuantity: number
  ) {
    let flag = false; //indica se o preço foi incluido ou não
    const existingServicePrice = await servicePrice.find({ order: orderId });

    if (existingServicePrice) {
      existingServicePrice.forEach((servicePrice) => {
        console.log("aqui", servicePrice.service.toString(), serviceId);

        if (servicePrice.service.toString() === serviceId) {
          flag = true;
          servicePrice.save();
        }
      });
    }

    if (flag) {
      if (servicesQuantity < existingServicePrice.length) {
        existingServicePrice.forEach(async (currentServicePrice) => {
          if (!serviceId.includes(currentServicePrice.service.toString())) {
            await servicePrice.findByIdAndDelete({ _id: currentServicePrice._id });
          }
        });
      }
    } else {
      const serviceOrder = await servicePrice.create({
        service: serviceId,
        price: currentServicePrice,
        order: orderId,
      });
    }
  }
}

export const orderServicePrice = new OrderServicePrice();
