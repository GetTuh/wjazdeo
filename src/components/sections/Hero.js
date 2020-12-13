import React from "react";
import classNames from "classnames";
import { SectionProps } from "../../utils/SectionProps";
import ButtonGroup from "../elements/ButtonGroup";
import Button from "../elements/Button";
import Image from "../elements/Image";
import { Link } from "react-router-dom";
const propTypes = {
  ...SectionProps.types,
};

const defaultProps = {
  ...SectionProps.defaults,
};

const Hero = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {
  const outerClasses = classNames(
    "hero section center-content",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "hero-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  return (
    <section {...props} className={outerClasses}>
      <div className="container-sm">
        <div className={innerClasses}>
          <div className="hero-content">
            <h1
              className="mt-0 mb-16 reveal-from-bottom"
              data-reveal-delay="200"
            >
              Nie dojeżdżaj sam.
            </h1>
            <div className="container-xs">
              <p
                className="m-0 mb-32 reveal-from-bottom"
                data-reveal-delay="400"
              >
                <ul class="nobull">
                  <li>
                    <b className="text-color-primary">Poznawaj</b> nowych
                    znajomych.
                  </li>
                  <li>
                    <b className="text-color-primary">Oszczędzaj</b> pieniądze.
                  </li>
                  <li>
                    <b className="text-color-primary">Dojeżdzaj</b> w komforcie.
                  </li>
                </ul>
              </p>
              <div className="reveal-from-bottom" data-reveal-delay="600">
                <ButtonGroup>
                  <Link to="/register">
                    <Button color="secondary" wideMobile>
                      Zarejestruj się
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button color="dark" wideMobile>
                      Zaloguj się
                    </Button>
                  </Link>
                </ButtonGroup>
              </div>
            </div>
          </div>
          <div
            className="hero-figure reveal-from-bottom illustration-element-01"
            data-reveal-value="20px"
            data-reveal-delay="800"
          >
            <Image
              className="has-shadow"
              src={require("./../../assets/images/welcomeImage.jpg")}
              alt="Hero"
              width={896}
              height={504}
            />
          </div>
        </div>
        <Link to="/map" className="reveal-from-bottom">
          <Button>Zobacz mapę z dojazdami</Button>
        </Link>
      </div>
    </section>
  );
};

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;
