export interface ApiResponse<T> {
    businessRuleViolation: boolean;
    data: T | T[];
    getNotFount: boolean;
    isSuccess: boolean;
    message: string;
    validationErrors: any;
  }