# Recuperação de senha
**User Storie**
- Como usuário, eu quero poder recuperar minha senha informando meu e-mail para que possa recuperar o acesso de minha conta quando esquecer minhas credenciais;

**RF**
- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um email com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF**
- Utilizar Mailtrap pra testar envios em ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**RN**
- O link enviado por email para resetar senha deve expirar em 2h;

# Atualização de perfil
**User storie**
- Como usuário, eu quero poder alterar meus dados cadastrais para que possa alterar meu nome, email, senha ou avatar quando necessário.

**RF**
- O usuário deve poder alterar seu email, nome, senha e avatar;

**RN**
- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;

# Agendamento de serviços
**RF**
- O usuário deve poder listar todos os prestadores de serviço cadastrados;
- O usuário deve poder selecionar um prestador e listar todos os seus horários disponíveis;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**
- A listagem de prestadores deve ser armazenada em cache;

**RN**
- Cada agendamento deve durar 1 hora;
- Os agendamentos devem estar disponíveis entre 8h às 18h;
- O usuário não pode agendar em um horário já agendado;
- O usuário não pode agendar serviço para um horário que já passou;


# Painel do prestador de serviço
**RF**
- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**
- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no mongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN**
