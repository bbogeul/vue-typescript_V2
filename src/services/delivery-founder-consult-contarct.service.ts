import { BaseService } from '@/core';
import { DeliveryFounderConsultContractDto } from '@/dto';

class DeliveryFounderConsultContractService extends BaseService {
  findForContract() {
    return super.get<DeliveryFounderConsultContractDto[]>(
      'admin/delivery-founder-consult-contract',
    );
  }

  deleteContarct(contarctNo) {
    return super.delete<DeliveryFounderConsultContractDto>(
      `admin/delivery-founder-consult-contract/${contarctNo}`,
    );
  }
}

export default new DeliveryFounderConsultContractService();
