import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ApiDocPage() {
  return (
    <div className="container mx-auto p-4 text-left">
      <h1 className="text-2xl font-bold mb-6">API Documentation</h1>
      <h4 className="text-lg mt-3">
        Integrate sentiment analysis directly into your applications
      </h4>

      <h3 className=" text-lg font-semibold mt-4 mb-2 p-1 ">API Endpoints</h3>

      <Card className="w-full max-w-1/2  mx-auto rounded-sm">
        <CardHeader className="bg-gray-100">
          <CardTitle>
            <span className="bg-green-100 mr-3 p-2 rounded-sm">POST</span>{" "}
            /api/v1/predict
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            <h4 className="font-medium mb-4 mt-2">
              Analyze sentiment of text content.
            </h4>
          </CardDescription>

          <div>
            <h4 className="font-semibold mb-2">API Authentication:</h4>
            <div className="bg-gray-100 rounded-lg m-3 p-5">
              <pre className="font-mono text-sm whitespace-pre-wrap">
                {`curl -X POST "http://localhost:8000/predict" \\
  -H "accept: application/json" \\
  -H "Content-Type: application/json" \\
  -H "X-Api-Key: {pk_******************}" \\  # Replace with your actual API key
  -d '{
    "text": "စာကောင်းကောင်းလုပ်ပါ"
  }'`}
              </pre>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Request Body:</h4>
            <p className="bg-gray-100  rounded-lg m-3 p-5 ">
              <pre className="font-mono text-sm whitespace-pre-wrap ">
                {`{ "text": "စာကောင်းကောင်းလုပ်ပါ" }`}
              </pre>
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Response:</h4>
            <p className="bg-gray-100 rounded-lg m-3 p-5">
              <pre className="font-mono text-sm whitespace-pre-wrap">
                {` {\n\t"text" : "စာကောင်းကောင်းလုပ်ပါ",\n\t"sentiment" : "Positive",\n\t"confidence" : 0.5092804209967021, \n
                            }`}
              </pre>
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <span className="font-semibold mb-2">Try it out:</span>
        </CardFooter>
      </Card>
    </div>
  );
}
