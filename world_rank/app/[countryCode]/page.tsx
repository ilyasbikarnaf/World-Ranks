export default function Country({
  params,
}: {
  params: { countryCode: string };
}) {
  return (
    <div>
      <div>
        <figure>either image or its flag</figure>
        <div>
          <h2>countyr name</h2>
          <p>something here</p>
        </div>
      </div>

      <div>
        <div>
          <p>population</p>
          <p>Population number</p>
        </div>

        <div>
          <p>
            Area (km<sup>2</sup>)
          </p>
          <p>area in km</p>
        </div>
      </div>

      <div>
        <div>
          <p>capital</p>
          <p>answer</p>
        </div>

        <div>
          <p>Subregion</p>
          <p>answer</p>
        </div>
        <div>
          <p>Language</p>
          <p>answer</p>
        </div>
        <div>
          <p>Currencies</p>
          <p>answer</p>
        </div>
        <div>
          <p>Continents</p>
          <p>answer</p>
        </div>
      </div>

      <div>
        <p>Neighbouring Countries</p>
        <div>
          {/* make component out of this */}
          <div>
            <p>Country flag</p>
            <p>country name</p>
          </div>
        </div>
      </div>
    </div>
  );
}
