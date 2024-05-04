export class Messaggio {
  ms_id?: any;
  chat_id?: any;
  sender?: string;

  id?: string;
  t_stamp?: string;
  content?: string;

  constructor(
    ms_id?: any,
    chat_id?: any,
    sender?: string,
    t_stamp?: string,
    content?: string
  ) {}
}
