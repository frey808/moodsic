import { Configuration, OpenAIApi } from "openai";

  const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});  
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const song = req.body.song || '';
  if (song.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid mood",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(song),
      temperature: 0.1,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(song) {
  const songList = '[ A Boy Named Sue, All I Want For Christmas Is You, All The Things She Said, Ambient Music For Airports, American Pie, Better Together, Beyond The Sea, Bizarre Love Triangle, Careless Whisper, Clint Eastwood, Curious George, Dragon Attack, Everything She Wants, Ghostbusters, Good Vibrations, Happy, Here Comes The Sun, Home, How To Save A Life, Hurt, I Can See Clearly Now, I Love You Baby, Just The Two Of US, Liquid Diamonds, O Fortuna Carmina Burana, Pirates Of The Caribbean Theme Song, Porpoise Song, Ride Of the Valkyries, Sakura Cherry Blossoms, Sakura Ikimono Gakari, Someone Like You, Stronger, Summertime Sadness,Take Me Home Country Roads, The Dragonbord Comes, Thriller, Under The Sea, What A Wonderful World]'
  return `select 1 song from these options: ${songList} that reminds you of ${song}. Only respond with the song name and no extra characters`;
}
