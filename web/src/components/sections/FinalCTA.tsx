import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/motion/Reveal";

export function FinalCTA() {
  return (
    <section className="py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-primary-600 px-8 py-16 text-center text-white sm:px-16">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
            <h2 className="relative text-3xl font-bold sm:text-4xl">Aajke shuru korun</h2>
            <p className="relative mx-auto mt-4 max-w-xl text-primary-50">
              Pilot-e first 20 doctor-er jonno jayga ache. Apnar ekta prothom consultation shuru korun.
            </p>
            <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button size="lg" variant="secondary">Doctor khujun</Button>
              <Button size="lg" className="bg-white text-primary-700 hover:bg-primary-50">
                Doctor hisebe join korun
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}