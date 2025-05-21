type ChatBubbleProps = {
  role: string;
  avatar: string;
  text: string;
};

const ChatBubble = ({ role, avatar, text }: ChatBubbleProps) => {
  if (role == "assistant") {
    let isObject = false;
    let parsedText = text;

    try {
      const tableObject = JSON.parse(text);
      if (tableObject && typeof tableObject == "object") {
        parsedText = tableObject;
        isObject = true;
      }
    } catch (error) {}

    if (isObject == false) {
      return (
        <div className="flex p-2 items-start">
          <img src={avatar} alt={`${role} avatar`} className="w-10" />
          <div className="px-2 bg-light-grey ml-2 rounded-xl  max-w-60 p-2">
            <p className="text-m text-left break-words">{text}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="flex p-2 items-start">
            <img src={avatar} alt={`${role} avatar`} className="w-10" />
            <div>
              <div className="px-2 bg-light-grey ml-2 rounded-xl  max-w-60 p-2 mb-2">
                <p className="text-m text-left break-words">
                  {parsedText.mensagem}
                </p>
              </div>
              <div className="px-2 bg-light-grey ml-2 rounded-xl  max-w-120 p-2">
                <table className="min-w-full border border-primary rounded-xl">
                  <thead className="bg-primary text-white ">
                    <tr>
                      <th className="border p-2 text-left border-primary ">
                        Data
                      </th>
                      <th className="border p-2 text-left border-primary">
                        Tipo
                      </th>
                      <th className="border p-2 text-left border-primary">
                        Hora Início
                      </th>
                      <th className="border p-2 text-left border-primary">
                        Hora Fim
                      </th>
                      <th className="border p-2 text-left border-primary">
                        Estado
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {parsedText.data.map((entry, index) => (
                      <tr key={index} className="hover:bg-sky-50 h-10 bg-white">
                        <td className="border p-2 border-primary min-w-30">
                          {entry.date}
                        </td>
                        <td className="border p-2 border-primary min-w-40">
                          {entry.type || entry.absence_type}
                        </td>
                        <td className="border p-2 border-primary min-w-20">
                          {entry.hora_inicio}
                        </td>
                        <td className="border p-2 border-primary min-w-20">
                          {entry.hora_fim}
                        </td>
                        <td className="border p-2 border-primary min-w-20">
                          {entry.estado}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  if (role == "user")
    return (
      <div className="flex p-2 items-start flex-row-reverse">
        <div className="px-2 bg-sky-100 ml-2 rounded-xl  max-w-60 p-2">
          <p className="text-m text-left break-words">{text}</p>
        </div>
      </div>
    );
};

export default ChatBubble;
