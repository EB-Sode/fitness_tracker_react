export default function ContactUs() {
  const coaches = [
    {
      name: "John Carter",
      image:
        "https://media.istockphoto.com/id/475495254/photo/african-american-male-trainer-with-clipboard.jpg?s=612x612&w=0&k=20&c=iRLoPvv1BDr1J6m7DdX03MUmCxiqV_wtMuKX7W9KRCE=",
    },
    {
      name: "Mike Johnson",
      image:
        "https://img.freepik.com/premium-photo/portrait-handsome-male-fitness-instructor-gym-healthy-lifestyle-sport-concept-background_948175-1778.jpg",
    },
    {
      name: "David Lee",
      image:
        "https://media.istockphoto.com/id/1146745072/photo/african-athletic-man-portrait.jpg?s=612x612&w=0&k=20&c=s5aMnbBNhFanlsgWGHG02fEb8qezqCIfphIGYWhG7ZU=",
    },
    {
      name: "Sophia Green",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbMw0tBJzbGGW2iZuMajuj21WRA-VPpENmzQ&s",
    },
  ];

  return (
    <section className="py-16 bg-gray-600 text-center" id="contact">
      <h2 className="text-4xl font-bold text-blue-200 mb-10">Contact Us</h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 mb-12">
        {coaches.map((coach, index) => (
          <div
            key={index}
            className="bg-gray-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300"
          >
            <img
              src={coach.image}
              alt={coach.name}
              className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-700">{coach.name}</h3>
          </div>
        ))}
      </div>

      <div className="text-red-400">
        <p className="text-lg">
          📞 +234 800 111 2222 &nbsp; | &nbsp; +234 900 333 4444
        </p>
        <p className="text-lg mt-2">
          📧 <a href="mailto:trackfitness@gmail.com" className="text-blue-200 hover:underline">trackfitness@gmail.com</a>
        </p>
      </div>
    </section>
  );
}
